import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceRoutingModule} from './invoice-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {CoreModule} from '../core/core.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {AgmCoreModule} from '@agm/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {DetailComponent} from './component/list/detail/detail.component';
import {InvoiceEditResolver} from './component/list/detail/detail.resolver';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TaxModule} from '../tax/tax.module';
import {UploadInvoiceComponent} from './component/upload-invoice/upload-invoice.component';
import {PricingModule} from '../pricing/pricing.module';
import {ConsumptionStatsComponent} from './widget/consumption-stats/consumption-stats.component';
import {DeliveryPointInvoicesTableComponent} from './component/list/detail/delivery-point-invoices-table/delivery-point-invoices-table.component';
import {DeliveryPointModule} from '../delivery-point/delivery-point.module';
import {ReportModule} from '../analysis-report/report.module';
import {AnomalyModule} from '../anomaly/anomaly.module';
import {DialogDeliveryPointsComponent} from './widget/consumption-stats/dialog-delivery-points/dialog-delivery-points.component';

import {
  ListComponent
    as ListDialogDeliveryPointsComponent
} from '../invoice/widget/consumption-stats/dialog-delivery-points/list/list.component';

import {
  TableComponent
    as TableDialogDeliveryPointsComponent
} from '../invoice/widget/consumption-stats/dialog-delivery-points/list/table/table.component';
import {ContractModule} from '../contract/contract.module';
import {InvoiceAnomalyTableComponent} from './component/list/detail/invoice-anomaly-list/invoice-anomaly-table/invoice-anomaly-table.component';
import {InvoiceAnomalyListComponent} from './component/list/detail/invoice-anomaly-list/invoice-anomaly-list.component';
import {ConsumptionVsBudgetStatsComponent} from './widget/consumption-vs-budget-stats/consumption-vs-budget-stats.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";


moment.locale(navigator.language);

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CoreModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    AgmCoreModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TaxModule,
    PricingModule,
    DeliveryPointModule,
    ReportModule,
    AnomalyModule,
    ContractModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    DetailComponent,
    UploadInvoiceComponent,
    ConsumptionStatsComponent,
    DeliveryPointInvoicesTableComponent,
    ListDialogDeliveryPointsComponent,
    TableDialogDeliveryPointsComponent,
    DialogDeliveryPointsComponent,
    InvoiceAnomalyTableComponent,
    InvoiceAnomalyListComponent,
    ConsumptionVsBudgetStatsComponent
  ],
  providers: [
    InvoiceEditResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'invoice', multi: true},
  ],
  entryComponents: [UploadInvoiceComponent, DialogDeliveryPointsComponent]
})

export class InvoiceModule {
}
