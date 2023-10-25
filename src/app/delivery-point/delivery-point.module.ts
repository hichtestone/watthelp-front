import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {DeliveryPointRoutingModule} from './delivery-point-routing.module';
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
import {DialogContractAssignementComponent} from './component/dialog-contract-assignement/dialog-contract-assignement.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {CreateComponent} from './component/create/create.component';
import {DeliveryPointEditResolver} from './component/edit/edit.resolver';
import {MatTabsModule} from '@angular/material/tabs';
import {AssociatedInvoicesComponent} from './component/detail/associated-invoices/associated-invoices.component';
import {GeneralInfoComponent} from './component/create/general-info/general-info.component';
import {AgmCoreModule} from '@agm/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditComponent} from './component/edit/edit.component';
import {ContractModule} from '../contract/contract.module';
import {PricingModule} from '../pricing/pricing.module';
import {TaxModule} from '../tax/tax.module';
import {InvoiceInfoComponent} from './component/detail/associated-invoices/invoice-info/invoice-info.component';
import {DeliveryPointInvoiceDetailResolver} from './component/detail/associated-invoices/resolver/detail.resolver';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {AnalysisFieldInfoComponent} from './component/detail/associated-invoices/analysis-field-info/analysis-field-info.component';
import {ExpandedAnalysisComponent} from './component/detail/associated-invoices/expanded-analysis/expanded-analysis.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AnalyzerPipe} from './pipe/analyzer.pipe';
import {StatsCountComponent} from './component/widget/stats-count/stats-count.component';
import {JoinPipe} from './pipe/join.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AnomalyModule} from '../anomaly/anomaly.module';
import {CreationModePipe} from './pipe/creation-mode.pipe';
import {PowerHistoryComponent} from './component/detail/power-history/power-history.component';
import {BudgetDeliveryPointStatComponent} from './component/widget/budget-delivery-point-stat/budget-delivery-point-stat.component';
import {HighchartsChartModule} from "highcharts-angular";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

moment.locale(navigator.language);

@NgModule({
  imports: [
    CommonModule,
    DeliveryPointRoutingModule,
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
    ContractModule,
    PricingModule,
    TaxModule,
    DigitOnlyModule,
    MatTooltipModule,
    MatDatepickerModule,
    AnomalyModule,
    HighchartsChartModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    DialogContractAssignementComponent,
    CreateComponent,
    GeneralInfoComponent,
    EditComponent,
    AssociatedInvoicesComponent,
    InvoiceInfoComponent,
    AnalysisFieldInfoComponent,
    ExpandedAnalysisComponent,
    AnalyzerPipe,
    JoinPipe,
    CreationModePipe,
    StatsCountComponent,
    PowerHistoryComponent,
    BudgetDeliveryPointStatComponent,
  ],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: 'deliverypoint', multi: true},
    DeliveryPointEditResolver,
    DeliveryPointInvoiceDetailResolver,
  ],
  exports: [
    ExpandedAnalysisComponent,
    JoinPipe,
    TableComponent,
    CreationModePipe
  ],
  entryComponents: [DialogContractAssignementComponent]
})

export class DeliveryPointModule {
}
