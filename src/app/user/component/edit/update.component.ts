import {Component, OnInit} from '@angular/core';
import {CreateComponent} from '../create/create.component';
import {UserInterface} from '../../model/user.interface';
import {take} from 'rxjs/operators';
import {Permission} from '../../../role/model/permission/permission-constant';
import {GroupDisplay} from '../../../role/model/permission/form/group.display';
import {Paginator} from '../../../core/model/paginator.model';
import {PermissionInterface} from '../../../role/model/permission/permission.interface';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class UpdateComponent extends CreateComponent implements OnInit {
  title = 'user.breadcrumb.edit';
  isUpdate = true;

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .subscribe((data: { user: UserInterface }) => {
        this.user = data.user;
        // To patch the role field with user list
        this.roles = this.user.roles;

        this.hasPermissionToEditOrCreate = this.aclService.hasAccess(Permission.USER_EDIT);

        // In order to avoid variables data conflicts, we assign the roles in another variable
        // which will allow to define his authorizations
        this.userRoles = this.user.roles;

        this.permissionService.list({})
          .pipe(take(1))
          .subscribe((paginator: Paginator<PermissionInterface>) => {
            this.permissions = paginator.data;

            this.permissionFormBuild();

            this.displayData = GroupDisplay.generateGroupsFromPermissions(this.permissions);

            this.isLoading = false;
          });


        this.form.patchValue(data.user, {emitEvent: false});

        if (!this.aclService.hasAccess(Permission.USER_EDIT)) {

          this.canEdit = this.authenticationService.currentUserValue.id === this.user.id;

          if (this.canEdit) {
            this.form.enable();
          } else {
            this.form.disable();
          }
        }
      });
  }

  submit(): void {
    const values = this.prepareDataToSubmit(this.form.getRawValue());
    if (values.password === '') {
      delete values.password;
    }
    delete values.password_confirm;
    delete values.permissions;

    this.userService.put(this.user.id, values, 'user_permission_codes').pipe(take(1)).subscribe(
      () => {

        if (this.file) {
          const operations = [{op: 'replace', path: '/avatar', value: this.file.id}];
          this.userService.uploadAvatar(this.user.id, operations, 'user_avatar').pipe(take(1)).subscribe(
            (image) => {
              this.user.avatar = image;
              this.imageUploading = false;
            },
            (error) => {
              this.imageUploading = false;
              const errorMessage = error.hasOwnProperty('avatar')
                ? error.avatar.join('\n')
                : this.translocoService.translate('user.upload-image-error');

              this.snackbarService.addMessage(errorMessage);
            });
        }

        this.snackbarService.addMessage(this.translocoService.translate('user.updated-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.handleFormError(error)
    );
  }

  permissionFormBuild(): void {
    const permissionsForm = {};

    const mergedPermissions = [];

    if (!!this.userRoles && this.userRoles.length > 0) {
      for (const role of this.userRoles) {

        if (!!role.permissions && role.permissions.length > 0) {

          for (const permission of role.permissions) {

            if (mergedPermissions.indexOf(permission) === -1) {
              mergedPermissions.push(permission);
            }
          }
        }
      }

      this.permissions.forEach(permission => {

        const isAuthorized = mergedPermissions && !!mergedPermissions.find((perm: PermissionInterface) => {
          return perm.id === permission.id;
        });
        permissionsForm[permission.id] = this.fb.control(isAuthorized);
      });
      const permissionFGs = this.fb.group(permissionsForm);

      this.form.setControl('permissions', permissionFGs);
    }
  }
}
