import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {BudgetRoutingModule} from './budget-routing.module';
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
import {DigitOnlyModule} from '@uiowa/digit-only';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TaxModule} from '../tax/tax.module';
import {DetailComponent} from './component/detail/detail.component';
import {BudgetEditResolver} from './component/detail/edit.resolver';
import {DeliveryPointBudgetTableComponent} from './component/detail/delivery-point-budget-table/delivery-point-budget-table.component';
import {EditDeliveryPointBudgetComponent} from './component/detail/edit-delivery-point-budget/edit-delivery-point-budget.component';
import {DeliveryPointBudgetEditResolver} from './component/detail/edit-delivery-point-budget/delivery-point-budget-edit.resolver';
import {ForecastBudgetConsumptionComponent} from './component/detail/edit-delivery-point-budget/forecast-budget-consumption/forecast-budget-consumption.component';
import {ForecastConsumptionComponent} from './component/detail/edit-delivery-point-budget/forecast-consumption/forecast-consumption.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PreviousBudgetComponent} from './component/detail/previous-budget/previous-budget.component';
import {CreateBudgetDialogComponent} from './component/create-budget-dialog/create-budget-dialog.component';
import {BudgetStatsComponent} from './component/widget/budget-stats/budget-stats.component';
import {ContractModule} from "../contract/contract.module";
import {TranslocoModule} from "@ngneat/transloco";

moment.locale(navigator.language);

@NgModule({
  imports: [
    CommonModule,
    BudgetRoutingModule,
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
    DigitOnlyModule,
    MatTooltipModule,
    MatDatepickerModule,
    TaxModule,
    MatSlideToggleModule,
    ContractModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    DetailComponent,
    DeliveryPointBudgetTableComponent,
    EditDeliveryPointBudgetComponent,
    ForecastBudgetConsumptionComponent,
    ForecastConsumptionComponent,
    PreviousBudgetComponent,
    CreateBudgetDialogComponent,
    BudgetStatsComponent
  ],
  exports: [
    TableComponent
  ],
  providers: [BudgetEditResolver, DeliveryPointBudgetEditResolver]
})

export class BudgetModule {
}
