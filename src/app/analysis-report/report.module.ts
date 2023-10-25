import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './component/list/list.component';
import {ReportRoutingModule} from './report-routing.module';
import {TableComponent} from './component/list/table/table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewComponent} from './component/view/view.component';
import {DetailComponent} from './component/detail/detail.component';
import {ViewResolver} from './component/view/view.resolver';
import {CoreModule} from '../core/core.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {TaxModule} from '../tax/tax.module';
import {DeliveryPointModule} from '../delivery-point/delivery-point.module';
import {PricingModule} from '../pricing/pricing.module';
import {MatButtonModule} from '@angular/material/button';
import {ReportStatComponent} from './component/view/report-stat/report-stat.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    CoreModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    TaxModule,
    DeliveryPointModule,
    PricingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    ViewComponent,
    DetailComponent,
    ReportStatComponent
  ],
  exports: [
    ReportStatComponent
  ],
  providers: [
    ViewResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'report', multi: true},
  ]
})
export class ReportModule {
}
