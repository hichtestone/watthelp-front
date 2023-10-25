import {Component, OnInit} from '@angular/core';
import {CreateComponent} from '../create/create.component';
import * as moment from 'moment';
import {PricingInterface} from '../../model/pricing.interface';
import {Permission} from '../../../role/model/permission/permission-constant';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class EditComponent extends CreateComponent implements OnInit {
  title = 'pricing.breadcrumb.edit';
  pricing: PricingInterface;

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .subscribe((data: { pricing: PricingInterface }) => {
        this.pricing = data.pricing;

        if (!this.aclService.hasAccess(Permission.PRICING_EDIT)) {
          this.form.disable();
        }

        this.form.patchValue(this.prepareDataToPatch(this.pricing));
      });
  }

  prepareDataToPatch(values): any {
    return {
      ...values,
      consumption_base_price: Number(+values.consumption_base_price / 10 ** 5).toFixed(3),
      subscription_price: !!values.subscription_price ? Number(values.subscription_price / 10 ** 7).toFixed(2) : null,
      started_at: values.started_at ? moment(values.started_at).format('YYYY-MM-DD') : null,
      finished_at: values.finished_at ? moment(values.finished_at).format('YYYY-MM-DD') : null
    };
  }

  submit(): void {
    this.pricingService.put(this.pricing.id, this.prepareDataToSubmit(this.form.getRawValue())).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('pricing.updated-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.handleFormError(error));
  }
}
