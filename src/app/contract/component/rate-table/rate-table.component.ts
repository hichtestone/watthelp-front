import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SimpleDataSource} from '../../../core/datasource/simple.datasource';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-rate-table',
  templateUrl: './rate-table.component.html',
  styleUrls: ['./rate-table.component.scss']
})
export class RateTableComponent {
  @Input() dataSourceRate: SimpleDataSource | null;
  @Input() paginatorRate: MatPaginator;
  @Output() deleteSelected = new EventEmitter<number>();

  defaultColumns = [
    'name',
    'started_at',
    'finished_at',
    'actions'
  ];
}
