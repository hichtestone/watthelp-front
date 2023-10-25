import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {AnomalyInterface} from '../../../../anomaly/model/anomaly.interface';
import {TableDataSource} from '../../../../core/table/datasource/table-datasource';

@Component({
  selector: 'app-import-anomaly-table',
  templateUrl: './import-anomaly-table.component.html',
  styleUrls: ['./import-anomaly-table.component.scss']
})
export class ImportAnomalyTableComponent extends TableColumnSettingsDirective implements AfterViewInit {
  userSettings = 'user_settings.import_anomaly.table';

  @Input() dataSource: TableDataSource<AnomalyInterface> | null;

  @Output() deleteSelected = new EventEmitter<(number)[]>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('common.creation-date', 'created_at', true),
    new Column('common.detail', 'content', true),
    new Column('common.type', 'type', true),
    new Column('common.status', 'status', true),
    new Column('common.difference', 'total', true),
    new Column('common.actions', 'actions', true, false)
  ];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
