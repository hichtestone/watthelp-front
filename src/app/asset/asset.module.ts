import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssetRoutingModule} from './asset-routing.module';
import {ListComponent} from './component/list/list.component';
import {TableComponent} from './component/list/table/table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {AnomalyModule} from '../anomaly/anomaly.module';
import {CoreModule} from '../core/core.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PricingModule} from '../pricing/pricing.module';
import {TaxModule} from "../tax/tax.module";
import {FilterComponent} from './component/list/filter/filter.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";


@NgModule({
  declarations: [ListComponent, TableComponent, FilterComponent],
  imports: [
    CommonModule,
    AssetRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    MatSortModule,
    AnomalyModule,
    CoreModule,
    MatPaginatorModule,
    PricingModule,
    TaxModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: 'asset', multi: true},
  ]
})
export class AssetModule {
}
