import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {GridComponent} from './component/grid/grid.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GridsterModule} from 'angular-gridster2';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {AddWidgetDialogComponent} from './component/dialog/add-widget-dialog.component';
import {CoreModule} from '../core/core.module';
import {MatDialogModule} from '@angular/material/dialog';
import {WidgetDirective} from './directive/widget.directive';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [
    GridComponent,
    AddWidgetDialogComponent,
    WidgetDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    GridsterModule,
    MatMenuModule,
    MatButtonModule,
    CoreModule,
    MatDialogModule,
    TranslocoModule
  ],
  entryComponents: [
    AddWidgetDialogComponent
  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'dashboard', multi: true}]
})
export class DashboardModule {
}
