import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GroupDisplay} from '../../../model/permission/form/group.display';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent {
  @Input() form: FormGroup;
  @Input() displayData: GroupDisplay[];

  get permissionControl(): FormGroup {
    return this.form.get('permissions') as FormGroup;
  }

  toggleValue(id): void {
    if (!!id) {
      const value = this.form.get('permissions.' + id).value;
      this.form.get('permissions.' + id).patchValue(!value);
    }
  }
}
