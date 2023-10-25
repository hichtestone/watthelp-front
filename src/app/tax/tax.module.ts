import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaxRoutingModule} from './tax-routing.module';
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
import {AmountConverterPipe} from './pipe/amount-converter.pipe';
import {EditComponent} from './component/edit/edit.component';
import {CreateComponent} from './component/create/create.component';
import {TaxEditResolver} from './component/edit/edit.resolver';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TaxLabelPipe} from './pipe/tax-label.pipe';
import {TaxUnitPipe} from './pipe/tax-unit.pipe';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {TaxSubscriptionStatsComponent} from './component/widget/tax-subscription-stats/tax-subscription-stats.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TaxRoutingModule,
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
    DigitOnlyModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    CreateComponent,
    EditComponent,
    AmountConverterPipe,
    TaxLabelPipe,
    TaxUnitPipe,
    TaxSubscriptionStatsComponent
  ],
  providers: [
    TaxEditResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'tax', multi: true},
  ],
  exports: [AmountConverterPipe, TaxLabelPipe, TaxUnitPipe]
})
export class TaxModule {
}
