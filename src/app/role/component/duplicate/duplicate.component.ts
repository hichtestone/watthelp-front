import {Component, OnInit} from '@angular/core';
import {RoleInterface} from '../../model/role.interface';
import {CreateComponent} from '../create/create.component';

@Component({
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.scss']
})
export class DuplicateComponent extends CreateComponent implements OnInit {
  redirectUrl = '../../';
  title = 'role.breadcrumb.duplicate';

  ngOnInit(): void {
    super.ngOnInit();

    this.route.data
      .subscribe((data: { role: RoleInterface }) => {
        this.role = this.role = {
          ...data.role,
          name: this.translocoService.translate('role.copy-of') + data.role.name
        };

        this.form.patchValue(this.role);
      });
  }
}
