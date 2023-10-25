import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
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
import {AlertStatComponent} from './component/widget/alert-stat/alert-stat.component';
import {ListComponent} from './component/list/list.component';
import {DetailComponent} from './component/detail/detail.component';
import {TableComponent} from './component/list/table/table.component';
import {CommentComponent} from './component/detail/comment/comment.component';
import {GeneralInfoComponent} from './component/detail/general-info/general-info.component';
import {AnomalyRoutingModule} from './anomaly-routing.module';
import {AnomalyEditResolver} from './component/detail/edit.resolver';
import {CoreModule} from '../core/core.module';
import {LabelEnumPipe} from './pipe/label-enum.pipe';
import {StatusEnumPipe} from './pipe/status-enum.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FilterComponent} from './component/list/filter/filter.component';
import {TaxModule} from '../tax/tax.module';
import {FormulaFormatterPipe} from './pipe/formula-formatter.pipe';
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";

@NgModule({
  imports: [
    CommonModule,
    AnomalyRoutingModule,
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
    MatNativeDateModule,
    TaxModule,
    TranslocoModule
  ],
  declarations: [
    ListComponent,
    TableComponent,
    DetailComponent,
    GeneralInfoComponent,
    CommentComponent,
    AlertStatComponent,
    FilterComponent,
    LabelEnumPipe,
    StatusEnumPipe,
    FormulaFormatterPipe
  ],
  exports: [
    TableComponent,
    LabelEnumPipe
  ],
  providers: [
    AnomalyEditResolver,
    {provide: TRANSLOCO_SCOPE, useValue: 'anomaly', multi: true},
  ]
})

export class AnomalyModule {
}
