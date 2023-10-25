import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PricingInterface} from '../../../pricing/model/pricing.interface';
import {ContractService} from '../../service/contract.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {PricingService} from '../../../pricing/service/pricing.service';
import {Paginator} from '../../../core/model/paginator.model';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {DeltaDate} from '../../../core/validator/date.validator';
import * as moment from 'moment';
import {SimpleDataSource} from '../../../core/datasource/simple.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {ProviderEnum} from '../../model/provider.enum';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {enumToArray} from '../../../core/enum/enum-converter';
import {InvoicePeriodEnum} from '../../model/invoice-period.enum';
import {AclService} from '../../../core/service/acl.service';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent extends AbstractFormComponent implements OnInit {
  form: FormGroup;
  pricingDropdownList: PricingInterface[];
  pricings: PricingInterface[] = [];

  providers = enumToArray(ProviderEnum);
  invoicePeriods = enumToArray(InvoicePeriodEnum);

  dataSourceRate: SimpleDataSource | null;
  @ViewChild('paginatorRate', {static: false}) paginatorRate: MatPaginator;

  title = 'contract.breadcrumb.contract-creation';

  contractType: string;

  constructor(
    protected fb: FormBuilder,
    protected contractService: ContractService,
    protected snackbarService: SnackbarService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected aclService: AclService,
    protected pricingService: PricingService,
    protected translocoService: TranslocoService
  ) {
    super();
    this.form = this.fb.group({
        reference: ['', Validators.required],
        rate: [''],
        pricing_ids: [''],
        provider: ['', Validators.required],
        type: ['', Validators.required],
        invoice_period: ['', Validators.required],
        started_at: ['', Validators.required],
        finished_at: ['']
      },
      {
        validators: DeltaDate('started_at', 'finished_at')
      }
    );
  }

  ngOnInit(): void {
    // DropDownList disable by default
    this.form.controls.rate.disable();
    this.dataSourceRate = new SimpleDataSource(this.paginatorRate);

    this.form.controls.type.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(value => {
        if (!!value) {
          this.form.controls.rate.reset();
          this.form.controls.rate.enable();

          // Populating pricing dropdown list
          this.pricingService.list({filters: this.filter()}).subscribe(
            (paginator: Paginator<PricingInterface>) => {
              this.pricingDropdownList = paginator.data.filter(item => item.type === value);
              this.contractType = value;
            });

        } else {
          this.form.controls.rate.disable();
        }
      });
  }

  // Add selected form item to the pricing list
  addItemForm(selectedValue: PricingInterface): void {
    this.form.controls.rate.reset();
    this.pricings.push(selectedValue);
    this.pricingDropdownListRefreshed(this.contractType);
    this.dataSourceRate.dataChange.next(this.pricings);

    if (this.pricings.length > 0) {
      this.form.controls.type.disable();
    }
  }

  submit(): void {
    this.contractService.post(this.prepareDataToSubmit(this.form.getRawValue())).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('contract.snack-bar.created'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      error => this.handleFormError(error)
    );
  }

  onDelete(pricingId: number): void {
    // Remove pricing from the list
    this.pricings.forEach((pricing: PricingInterface, index) => {
      if (pricing.id === pricingId) {
        this.pricings.splice(index, 1);
      }
    });

    // Update the list after the removal
    this.dataSourceRate.dataChange.next(this.pricings);
    this.pricingDropdownListRefreshed(this.contractType);

    if (this.pricings.length === 0) {
      this.form.controls.type.enable();
    }

    this.snackbarService.addMessage(this.translocoService.translate('contract.snack-bar.deleted-price'));
  }

  prepareDataToSubmit(values): any {
    delete values.rate;

    return {
      ...values,
      pricing_ids: this.pricings.map(item => item.id),
      started_at: values.started_at ? moment(values.started_at).format('YYYY-MM-DD') : null,
      finished_at: values.finished_at ? moment(values.finished_at).format('YYYY-MM-DD') : null
    };
  }

  // Dropdown pricing list refreshed using the exclusion filter
  pricingDropdownListRefreshed(type): void {
    this.pricingService.list({
      filters: this.filter()
    }).subscribe(
      (paginator: Paginator<PricingInterface>) => {
        this.pricingDropdownList = paginator.data.filter(item => item.type === type);
      });
  }

  // Setting up the excluding pricing IDs and periods filter
  filter(): { exclude_ids: number[], excluded_periods: { started_at: string, finished_at: string }[] } {
    const format = 'YYYY-MM-DD';
    return {
      exclude_ids: !this.pricings ? null : this.pricings.filter(val => !!val.id).map(pricing => pricing.id),
      excluded_periods: !this.pricings ? null : this.pricings.map((pricing) => {
        return {
          started_at: moment(pricing.started_at).format(format),
          finished_at: !pricing.finished_at ? null : moment(pricing.finished_at).format(format)
        };
      })
    };
  }

  destroy(): void {
  }
}
