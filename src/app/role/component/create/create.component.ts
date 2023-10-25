import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {RoleService} from '../../service/role.service';
import {take} from 'rxjs/operators';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {RoleInterface} from '../../model/role.interface';
import {AclService} from '../../../core/service/acl.service';
import {GroupDisplay} from '../../model/permission/form/group.display';
import {PermissionInterface} from '../../model/permission/permission.interface';
import {PermissionService} from '../../service/permission.service';
import {Paginator} from '../../../core/model/paginator.model';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends AbstractFormComponent implements OnInit {
  title = 'role.breadcrumb.create';
  redirectUrl = '../';

  role: RoleInterface;
  form: FormGroup;
  hasAccess: boolean;
  isLoading = true;
  noDataDescription = 'common.loading';

  permissions: PermissionInterface[];
  displayData: GroupDisplay[] = [];

  constructor(protected fb: FormBuilder,
              protected roleService: RoleService,
              protected aclService: AclService,
              protected permissionService: PermissionService,
              protected snackbarService: SnackbarService,
              protected translocoService: TranslocoService,
              protected router: Router,
              protected route: ActivatedRoute) {
    super();

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: '',
      permissions: this.fb.group({})
    });
  }

  ngOnInit(): void {
    this.permissionService.list({})
      .pipe(take(1))
      .subscribe((paginator: Paginator<PermissionInterface>) => {
        this.permissions = paginator.data;

        this.buildPermissionForm();

        this.displayData = GroupDisplay.generateGroupsFromPermissions(this.permissions);

        this.isLoading = false;
      });
  }

  submit(): void {
    this.roleService.post(this.prepareDataToSend(this.form.getRawValue()))
      .pipe(take(1))
      .subscribe(
        () => {
          this.snackbarService.addMessage(this.translocoService.translate('role.created-success'));
          this.router.navigate([this.redirectUrl], {relativeTo: this.route});
        },
        (error) => {
          this.handleFormError(error);
        }
      );
  }

  prepareDataToSend(values: any): any {
    const permissionIds = [];
    for (const permission in values.permissions) {
      if (values.permissions.hasOwnProperty(permission) && !!values.permissions[permission]) {
        permissionIds.push(permission);
      }
    }
    values.permissions = permissionIds.map(id => parseInt(id, 10));

    return values;
  }

  buildPermissionForm(): void {
    const permissionsForm = {};

    this.permissions.forEach(permission => {
      const isAuthorized = this.role && this.role.permissions && !!this.role.permissions.find((perm: PermissionInterface) => {
        return perm.id === permission.id;
      });
      permissionsForm[permission.id] = this.fb.control(isAuthorized);
    });

    const permissionFGs = this.fb.group(permissionsForm);

    this.form.setControl('permissions', permissionFGs);
  }
}
