import {Component, OnInit} from '@angular/core';
import {CreateComponent} from '../create/create.component';
import * as moment from 'moment';
import {TaxInterface} from '../../model/tax-interface';
import {Permission} from '../../../role/model/permission/permission-constant';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class EditComponent extends CreateComponent implements OnInit {
  title = 'tax.breadcrumb.detail';
  tax: TaxInterface;

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .subscribe((data: { tax: TaxInterface }) => {
        this.tax = data.tax;

        if (!this.aclService.hasAccess(Permission.TAX_EDIT)) {
          this.form.disable();
        }

        this.form.patchValue(this.prepareDataToPatch(this.tax));
      });
  }

  prepareDataToPatch(values): any {
    const coefficient = 100000;

    return {
      cspe: Number((+values.cspe / coefficient)),
      tdcfe: Number((+values.tdcfe / coefficient)),
      tccfe: Number((+values.tccfe / coefficient)),
      cta: Number((+values.cta / 100).toFixed(2)),
      started_at: values.started_at ? moment(values.started_at).format('YYYY-MM-DD') : null,
      finished_at: values.finished_at ? moment(values.finished_at).format('YYYY-MM-DD') : null
    };
  }

  submit(): void {
    this.taxService.put(this.tax.id, this.prepareDataToSubmit(this.form.value)).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('tax.updated-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => {
        this.handleFormError(error);
      });
  }
}
