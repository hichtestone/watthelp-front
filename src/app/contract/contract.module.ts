import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractRoutingModule} from './contract-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './component/list/table/table.component';
import {ListComponent} from './component/list/list.component';
import {CoreModule} from '../core/core.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {CreateComponent} from './component/create/create.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {RateTableComponent} from './component/rate-table/rate-table.component';
import {ContractEditResolver} from './component/edit/edit.resolver';
import {EditComponent} from './component/edit/edit.component';
import {ContractSelectComponent} from './component/select/contract-select.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PricingModule} from '../pricing/pricing.module';
import {InvoicePeriodPipe} from './component/pipe/invoice-period.pipe';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ContractRoutingModule,
    CoreModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    PricingModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    CreateComponent,
    EditComponent,
    RateTableComponent,
    ContractSelectComponent,
    InvoicePeriodPipe
  ],
  providers: [
    ContractEditResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'contract', multi: true}
  ],
  exports: [
    ContractSelectComponent,
    InvoicePeriodPipe]
})
export class ContractModule {
}
