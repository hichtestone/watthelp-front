import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {TaxInterface} from '../../../model/tax-interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';

@Component({
  selector: 'app-tax-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective implements OnInit {
  userSettings = 'user_settings.tax.table';

  @Input() dataSource: ApiDataSource<TaxInterface> | null;

  @Output() deleteSelected = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('CSPE', 'cspe', true),
    new Column('TDCFE', 'tdcfe', true),
    new Column('TCCFE', 'tccfe', true),
    new Column('CTA', 'cta', true),
    new Column('common.started-at', 'started_at', true),
    new Column('common.finished-at', 'finished_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  ngOnInit(): void {
    super.ngOnInit();
  }

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }

  trackById(index, item): number {
    return item.id;
  }
}
