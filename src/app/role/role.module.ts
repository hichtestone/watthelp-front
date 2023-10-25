import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoleRoutingModule} from './role-routing.module';
import {CreateComponent} from './component/create/create.component';
import {EditComponent} from './component/edit/edit.component';
import {ListComponent} from './component/list/list.component';
import {CoreModule} from '../core/core.module';
import {CdkTableModule} from '@angular/cdk/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TableComponent} from './component/list/table/table.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NotificationModule} from '../notification/notification.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {DuplicateComponent} from './component/duplicate/duplicate.component';
import {FormComponent} from './component/create/form/form.component';
import {PermissionComponent} from './component/create/permission/permission.component';
import {PermissionColorPipe} from './pipe/permission-color.pipe';
import {LegendComponent} from './component/create/permission/legend/legend.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DuplicateComponent,
    ListComponent,
    TableComponent,
    FormComponent,
    PermissionComponent,
    PermissionColorPipe,
    LegendComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    RoleRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    NotificationModule,
    MatTabsModule,
    MatCardModule,
    TranslocoModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  exports: [
    PermissionColorPipe,
    LegendComponent
  ],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: 'role', multi: true},
  ]
})
export class RoleModule {
}
