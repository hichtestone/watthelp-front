import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {PricingInterface} from '../../../model/pricing.interface';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.pricing.table';

  @Input() dataSource: ApiDataSource<PricingInterface> | null | any;

  @Input() isDisplayActions = true;

  @Output() deleteSelected = new EventEmitter<number>();

  @Output() exportExcel = new EventEmitter<SelectionModel<PricingInterface>>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.name', 'name', true),
    new Column('common.type', 'type', true),
    new Column('common.started-at', 'started_at', true),
    new Column('common.finished-at', 'finished_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }

  trackById(index, item): number {
    return item.id;
  }

}
