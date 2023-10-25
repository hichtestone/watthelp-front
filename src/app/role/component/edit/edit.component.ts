import {Component, OnInit} from '@angular/core';
import {CreateComponent} from '../create/create.component';
import {RoleInterface} from '../../model/role.interface';
import {take} from 'rxjs/operators';
import {Permission} from "../../model/permission/permission-constant";

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class EditComponent extends CreateComponent implements OnInit {
  title = 'role.breadcrumb.edit';

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .subscribe((data: { role: RoleInterface }) => {
        this.role = data.role;
        this.hasAccess = this.aclService.hasAccess(Permission.ROLE_EDIT);
        if (!this.hasAccess) {
          this.form.disable();
        }

        this.form.patchValue(this.role);
      });
  }

  submit(): void {

    this.roleService.put(this.role.id, this.prepareDataToSend(this.form.getRawValue()))
      .pipe(take(1))
      .subscribe(
        () => {
          this.snackbarService.addMessage(this.translocoService.translate('role.updated-success'));
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (error) => {
          this.handleFormError(error);
        }
      );
  }
}
