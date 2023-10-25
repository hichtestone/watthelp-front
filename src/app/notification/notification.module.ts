import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './component/list/list.component';
import {NotificationRoutingModule} from './notification-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TableComponent} from './component/list/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CoreModule} from '../core/core.module';
import {MatButtonModule} from '@angular/material/button';
import {TruncatePipe} from './pipe/truncate.pipe';
import {NavBarRingBellComponent} from './component/nav-bar-notification/nav-bar-ring-bell/nav-bar-ring-bell.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NotificationRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CoreModule,
    MatButtonModule,
    TranslocoModule
  ],
  exports: [
    TruncatePipe,
    NavBarRingBellComponent
  ],
  declarations: [
    ListComponent,
    TableComponent,
    TruncatePipe,
    NavBarRingBellComponent
  ],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: 'notification', multi: true}
  ]
})
export class NotificationModule {
}
