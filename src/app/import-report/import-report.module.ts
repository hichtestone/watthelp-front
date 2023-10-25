import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportReportRoutingModule} from './import-report-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
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
import {MatButtonModule} from '@angular/material/button';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {DetailComponent} from './component/detail/detail.component';
import {ImportReportResolver} from './component/detail/detail.resolver';
import {TaxModule} from '../tax/tax.module';
import {DeliveryPointModule} from '../delivery-point/delivery-point.module';
import {MatMenuModule} from '@angular/material/menu';
import {ImportReportTypePipe} from './pipe/import-report-type.pipe';
import {AnomalyModule} from '../anomaly/anomaly.module';
import {ImportAnomalyTableComponent} from './component/detail/import-anomaly-table/import-anomaly-table.component';
import {BudgetModule} from '../budget/budget.module';
import {ReimportInvoiceTableComponent} from './component/detail/reimport-invoice-table/reimport-invoice-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PricingModule} from '../pricing/pricing.module';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImportReportRoutingModule,
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
    MatButtonModule,
    TaxModule,
    DeliveryPointModule,
    MatMenuModule,
    AnomalyModule,
    BudgetModule,
    MatCheckboxModule,
    PricingModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    DetailComponent,
    ImportReportTypePipe,
    ImportAnomalyTableComponent,
    ReimportInvoiceTableComponent
  ],
  providers: [
    ImportReportResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'import', multi: true},
  ]
})
export class ImportReportModule {
}
