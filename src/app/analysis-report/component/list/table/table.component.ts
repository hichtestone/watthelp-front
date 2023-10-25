import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {ReportAnalysisInterface} from '../../../model/report-analysis.interface';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.report_analysis.table';

  @Input() dataSource: ApiDataSource<ReportAnalysisInterface> | null;

  @Output() deleteSelection = new EventEmitter<SelectionModel<ReportAnalysisInterface>>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.invoice', 'invoice', true),
    new Column('common.status', 'status', true),
    new Column('common.creation-date', 'created_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  trackById(index, item): number {
    return item.id;
  }
}
