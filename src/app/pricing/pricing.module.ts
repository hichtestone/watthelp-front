import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricingRoutingModule} from './pricing-routing.module';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSortModule} from '@angular/material/sort';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule} from '@angular/material/button';
import {PricingEditResolver} from './component/edit/edit.resolver';
import {CreateComponent} from './component/create/create.component';
import {EditComponent} from './component/edit/edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TypeEnumPipe} from './pipe/type-enum.pipe';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {PricingEvolutionComponent} from './component/widget/pricing-evolution/pricing-evolution.component';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PricingRoutingModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    CdkTableModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DigitOnlyModule,
    MatCheckboxModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    TypeEnumPipe,
    CreateComponent,
    EditComponent,
    PricingEvolutionComponent
  ],
  exports: [
    TypeEnumPipe,
    TableComponent,
    PricingEvolutionComponent
  ],
  providers: [
    PricingEditResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'pricing', multi: true},
  ]
})
export class PricingModule {
}
