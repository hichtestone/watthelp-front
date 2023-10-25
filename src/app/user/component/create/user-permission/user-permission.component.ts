import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GroupDisplay} from '../../../../role/model/permission/form/group.display';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['../../../../role/component/create/permission/permission.component.scss']
})
export class UserPermissionComponent {
  @Input() form: FormGroup;
  @Input() displayData: GroupDisplay[];

  get permissionControl(): FormGroup {
    return this.form.get('permissions') as FormGroup;
  }
}
