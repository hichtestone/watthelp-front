import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {CreateComponent} from '../create/create.component';
import {ContractInterface} from '../../model/contract.interface';
import {Permission} from '../../../role/model/permission/permission-constant';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class EditComponent extends CreateComponent implements OnInit {
  title = 'contract.breadcrumb.contract-edition';
  contract: ContractInterface;

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .pipe(take(1))
      .subscribe((data: { contract: ContractInterface }) => {
        this.contract = data.contract;
        this.pricings = this.contract.pricings;

        if (!this.aclService.hasAccess(Permission.CONTRACT_EDIT)) {
          this.form.disable();
        }

        if (this.pricings.length > 0) {
          this.form.controls.type.disable();
        }
        this.form.patchValue(this.contract);
      });

    this.pricingDropdownListRefreshed(this.contract.type);
    this.dataSourceRate.dataChange.next(this.pricings);
  }

  submit(): void {
    this.contractService.put(this.contract.id, this.prepareDataToSubmit(this.form.getRawValue()))
      .pipe(take(1))
      .subscribe(
        () => {
          this.snackbarService.addMessage(this.translocoService.translate('contract.snack-bar.updated'));
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (error) => this.handleFormError(error)
      );
  }
}
