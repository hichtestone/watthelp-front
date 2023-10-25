import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';
import {CreateComponent} from '../create/create.component';
import {DeliveryPointInterface} from '../../model/delivery-point.interface';
import {SimpleDataSource} from '../../../core/datasource/simple.datasource';
import {Permission} from '../../../role/model/permission/permission-constant';
import * as moment from 'moment';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class EditComponent extends CreateComponent implements OnInit {
  title = 'deliverypoint.breadcrumb.dp-edition';
  form: FormGroup;
  deliveryPoint: DeliveryPointInterface;

  ngOnInit(): void {
    super.ngOnInit();
    this.isEditMode = true;
    this.dataSource = new SimpleDataSource(this.paginator);
    this.budgetAccess = this.aclService.hasAccess(Permission.BUDGET_VIEW);
    this.consumptionAccess = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.data
      .pipe(take(1))
      .subscribe((data: { deliveryPoint: DeliveryPointInterface }) => {
        this.deliveryPoint = data.deliveryPoint;
        this.form.controls.is_in_scope.disable();
        this.mode = this.deliveryPoint.creation_mode;

        this.dataSource.dataChange.next(this.deliveryPoint.delivery_point_invoices);
        this.powerHistoryDataSource.setTabValues(this.deliveryPoint.power_history);

        if (!!this.deliveryPoint.photo) {
          this.files.push(this.deliveryPoint.photo);
        }
        this.deliveryPoint.delivery_point_budgets.forEach((deliveryPointBudget) => {

          if (deliveryPointBudget.budget.year === moment().year()) {
            this.budgetExist = true;
          }
        });

        this.form.patchValue(this.deliveryPoint);
      });
  }

  submit(): void {
    this.deliveryPointService.put(this.deliveryPoint.id, this.prepareDataToSubmit(this.form.getRawValue())).pipe(take(1)).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.delivery-point-updated'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.errors = error
    );
  }
}
