import {Component, OnInit, ViewChild} from '@angular/core';
import {BudgetInterface} from '../../model/budget.interface';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BudgetService} from '../../service/budget.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {DeliveryPointBudgetInterface} from '../../model/delivery-point-budget.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {enumToArray} from '../../../core/enum/enum-converter';
import {InvoicePeriodEnum} from '../../../contract/model/invoice-period.enum';
import {DeliveryPointBudgetService} from '../../service/delivery-point-budget.service';
import {DeliveryPointBudgetTableComponent} from './delivery-point-budget-table/delivery-point-budget-table.component';
import {ApiDataSource} from '../../../core/datasource/api.datasource';

@Component({
  selector: 'app-edit',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends AbstractFormComponent implements OnInit {
  title = 'Détail d\'un Budget';
  form: FormGroup;
  pattern = '[0-9]+([.][0-9]{1,2})?';
  budget: BudgetInterface;
  noInvoicePeriods = enumToArray(InvoicePeriodEnum);

  dataSource: ApiDataSource<DeliveryPointBudgetInterface> | null;

  @ViewChild('table', {static: true}) table: DeliveryPointBudgetTableComponent;

  constructor(private fb: FormBuilder,
              private budgetService: BudgetService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private deliveryPointBudgetService: DeliveryPointBudgetService,) {
    super();

    this.form = this.fb.group({
      budget_form: this.fb.group({
        year: {value: ['', Validators.compose([Validators.required, Validators.min(0)])], disabled: true},
        average_price: ['', Validators.compose([Validators.required, Validators.min(0), Validators.pattern(this.pattern)])],
        total_hours: ['', Validators.compose([Validators.required, Validators.min(0), Validators.pattern('[0-9]*')])],
        total_consumption: ['', Validators.pattern(this.pattern)],
        total_amount: ['', Validators.pattern(this.pattern)],
        calculated_quantity: {value: '', disabled: true},
        calculated_amount: {value: '', disabled: true},
      }),

      filters_form: this.fb.group({
        reference: '',
        code: '',
        contract: '',
        is_in_scope: '',
        no_invoice_for_months: ''
      })
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { budget: BudgetInterface }) => {
        this.budget = data.budget;

        this.form.controls.budget_form.patchValue(this.prepareDataToPatch(this.budget));
      });

    this.dataSource = new ApiDataSource<DeliveryPointBudgetInterface>(
      this.deliveryPointBudgetService,
      this.table.paginator,
      this.table.sort,
      'delivery_point_budget_delivery_point,delivery_point_contract'
    );

    this.table.sort.sort({id: 'reference', start: 'asc', disableClear: false});

    this.dataSource.filter = {budget: this.budget.id};

    this.form.controls.filters_form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.controls.filters_form.value));
  }

  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = this.prepareFilter(form);
      this.table.paginator.firstPage();
    }
  }

  submit(): void {
    this.budgetService.put(this.budget.id, this.prepareDataToSubmit(this.form.getRawValue())).subscribe(
      () => {

        this.snackbarService.addMessage('Budget mis à jour avec succès !');

        this.router.navigate(['../'], {relativeTo: this.route});
      },
      error => this.handleFormError(error)
    );
  }

  removeDeliveryPointBudget(ids: number[]): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: 'Confirmation de suppression',
        description: 'Êtes-vous certain de vouloir supprimer ce(s) budget(s) de points de livraison ?'
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.budgetService.removeDeliveryPointBudget(this.budget.id, ids).subscribe(
            () => {
              this.dataSource.filter = this.dataSource.filter;

              this.snackbarService.addMessage('La suppression a bien été effectuée.');
            },
            () => {
              this.snackbarService.addMessage('Une erreur est survenue lors de la suppression.');
            }
          );
        }
      });
  }

  prepareDataToPatch(values: any): any {
    return {
      ...values,
      average_price: values.average_price ? this.parseValueToString(values.average_price, 10 ** 7) : null,
      total_hours: +values.total_hours || null,
      total_consumption: values.total_consumption ? this.parseValueToString(values.total_consumption, 100) : null,
      total_amount: values.total_amount ? this.parseValueToString(values.total_amount, 10 ** 7) : null,
      calculated_amount: values.calculated_amount ? this.parseValueToString(values.calculated_amount, 10 ** 7) : null,
    };
  }

  prepareDataToSubmit(values: any): any {
    const data = values.budget_form;

    delete data.calculated_quantity;
    delete data.calculated_amount;
    delete data.year;

    return {
      average_price: this.parseValueToInt(data.average_price, 10 ** 7) || 0,
      total_hours: +data.total_hours || 0,
      total_consumption: this.parseValueToInt(data.total_consumption, 100) || null,
      total_amount: this.parseValueToInt(data.total_amount, 10 ** 7) || null,
    };
  }

  prepareFilter(values): any {
    return {
      ...values,
      budget: this.budget.id,
      contract: !!values.contract ? values.contract.id : null
    };
  }

  destroy(): void {
  }

  reset(): void {
    this.form.controls.filters_form.reset();
    this.filter(this.form.controls.filters_form.value);
  }
}
