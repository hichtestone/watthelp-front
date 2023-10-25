import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DeltaDate} from '../../../core/validator/date.validator';
import {PricingService} from '../../service/pricing.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {AclService} from '../../../core/service/acl.service';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends AbstractFormComponent implements OnInit {
  title = 'pricing.breadcrumb.create';
  subscriptionPattern = '[0-9]+([.][0-9]{1,2})?';
  consumptionPattern = '[0-9]+([.][0-9]{1,3})?';

  form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected pricingService: PricingService,
    protected snackbarService: SnackbarService,
    protected router: Router,
    protected aclService: AclService,
    protected translocoService: TranslocoService,
    protected route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        consumption_base_price: ['', Validators.compose([Validators.required, Validators.pattern(this.consumptionPattern)])],
        started_at: ['', Validators.required],
        finished_at: ['', Validators.required]
      },
      {
        validators: DeltaDate('started_at', 'finished_at')
      });

    this.form.controls.type.valueChanges.pipe(untilDestroyed(this, 'destroy'))
      .subscribe((value => {
        if (value === 'regulated') {
          this.form.addControl(
            'subscription_price',
            new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.subscriptionPattern)])));
        } else {
          this.form.removeControl('subscription_price');
        }
      }));
  }

  public submit(): void {
    this.pricingService.post(this.prepareDataToSubmit(this.form.getRawValue())).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('pricing.created-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.handleFormError(error));
  }

  prepareDataToSubmit(values): any {
    const dataToSend = {
      ...values,
      consumption_base_price: this.parseValueToInt(values.consumption_base_price, 100000),
      subscription_price: this.parseValueToInt(values.subscription_price, 10 ** 7),
      started_at: values.started_at ? moment(values.started_at).format('YYYY-MM-DD') : null,
      finished_at: values.finished_at ? moment(values.finished_at).format('YYYY-MM-DD') : null
    };

    if (values.type === 'negotiated') {
      delete dataToSend.subscription_price;
      return dataToSend;
    } else {
      return dataToSend;
    }
  }

  destroy(): void {
  }
}
