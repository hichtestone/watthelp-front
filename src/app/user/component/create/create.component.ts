import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {PasswordValidator} from '../../../core/validator/password.validator';
import {StrengthValidator} from '../../../core/validator/strength.validator';
import {take} from 'rxjs/operators';
import {FileService} from '../../../core/service/file.service';
import {AclService} from '../../../core/service/acl.service';
import {RoleInterface} from '../../../role/model/role.interface';
import {FileInterface} from '../../../core/model/file.interface';
import {UserInterface} from '../../model/user.interface';
import {PermissionInterface} from '../../../role/model/permission/permission.interface';
import {GroupDisplay} from '../../../role/model/permission/form/group.display';
import {PermissionService} from '../../../role/service/permission.service';
import {RoleService} from '../../../role/service/role.service';
import {Paginator} from '../../../core/model/paginator.model';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {Permission} from '../../../role/model/permission/permission-constant';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends AbstractFormComponent implements OnInit {
  title = 'user.breadcrumb.create';
  form: FormGroup;

  isUpdate = false;
  imageUploading = false;
  canEdit = false;
  hasPermissionToEditOrCreate = false;
  isLoading = true;

  // To populate role list on creation mode
  roles: RoleInterface[] = [];

  // Roles belonging to specific user
  userRoles: RoleInterface[] = [];

  user: UserInterface;
  file: FileInterface;

  noDataDescription = 'common.loading';
  permissions: PermissionInterface[] = [];
  displayData: GroupDisplay[] = [];

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
    protected fileService: FileService,
    protected aclService: AclService,
    protected roleService: RoleService,
    protected permissionService: PermissionService,
    protected authenticationService: AuthenticationService,
    protected snackbarService: SnackbarService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected translocoService: TranslocoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose(
        [
          Validators.required,
          StrengthValidator.isValid
        ]
      )],
      password_confirm: [''],
      mobile: '',
      phone: '',
      roles: ['', Validators.required],
      permissions: this.fb.group({})
    }, {
      validator: PasswordValidator.MatchPassword(!this.isUpdate)
    });
    this.hasPermissionToEditOrCreate = this.aclService.hasAccess(Permission.USER_EDIT);

    this.roleService.list({sort: 'name', sort_order: 'asc'})
      .pipe(take(1))
      .subscribe((paginator: Paginator<RoleInterface>) => {
        this.roles = paginator.data;
      });
  }

  submit(): void {
    const values = this.prepareDataToSubmit(this.form.getRawValue());
    delete values.password_confirm;
    delete values.permissions;

    this.userService.post(values, 'user_permission_codes').pipe(take(1)).subscribe(
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('user.created-success'));
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error) => this.handleFormError(error)
    );
  }

  prepareDataToSubmit(values: any): any {
    return {
      ...values,
      roles: !!values.roles ? values.roles.map((role: RoleInterface) => role.id) : null
    };
  }

  uploadImage(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageUploading = true;
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.fileService.upload(formData).subscribe((fileUpload: FileInterface) => {

          if (!!fileUpload) {
            this.file = fileUpload;
            this.user.avatar = this.file;
            this.imageUploading = false;
          }
        },
        (error) => {
          this.imageUploading = false;
          this.handleFormError(error);
        });
    }
  }

  /*  Depending on a use-case it is good to know that initializing some default options
      as selected might not work by simply binding to the ngModel,
      because default values are different object instances than those in the options array.
      It is possible to set them as selected like so:
   */
  compareFn(r1: RoleInterface, r2: RoleInterface): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }
}
