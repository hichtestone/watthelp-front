import {Component, Input, ViewChild} from '@angular/core';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ImportReportInterface} from '../../../model/import-report.interface';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';

@Component({
  selector: 'app-import-report-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.import_report.table';

  @Input() dataSource: ApiDataSource<ImportReportInterface> | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  defaultColumns: Column[] = [
    new Column('common.user', 'user', true),
    new Column('common.type', 'type', true),
    new Column('common.provider', 'provider', true),
    new Column('common.creation-date', 'created_at', true),
    new Column('common.status', 'status', true),
    new Column('common.actions', 'actions', true, false)
  ];

  trackById(index, item): number {
    return item.id;
  }
}
