import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './component/list/list.component';
import {CreateComponent} from './component/create/create.component';
import {UpdateComponent} from './component/edit/update.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserEditResolver} from './component/edit/edit.resolver';
import {CoreModule} from '../core/core.module';
import {TableComponent} from './component/list/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {RoleModule} from '../role/role.module';
import {UserPermissionComponent} from './component/create/user-permission/user-permission.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    CoreModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    NgxMatIntlTelInputModule,
    RoleModule,
    MatTooltipModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    CreateComponent,
    UpdateComponent,
    UserPermissionComponent
  ],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: 'user', multi: true},
    UserEditResolver,
  ]
})
export class UserModule {
}
