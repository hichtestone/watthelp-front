import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {DeliveryPointInterface} from '../../../model/delivery-point.interface';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';

@Component({
  selector: 'app-delivery-point-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.delivery_point.table';

  @Input() dataSource: ApiDataSource<DeliveryPointInterface> | null | any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() exportExcel = new EventEmitter<SelectionModel<DeliveryPointInterface>>();

  @Output() assignContract = new EventEmitter<SelectionModel<DeliveryPointInterface>>();

  @Output() deleteSelected = new EventEmitter<number>();

  @Input() isDisplayActions = true;

  @Input()
  defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('deliverypoint.list.reference-rae', 'reference', true),
    new Column('deliverypoint.list.internal-code', 'code', true),
    new Column('deliverypoint.list.address', 'address', true),
    new Column('deliverypoint.list.contract-reference', 'contract_reference', true),
    new Column('deliverypoint.list.creation-mode', 'creation_mode', false),
    new Column('deliverypoint.list.in-scope', 'is_in_scope', true),
    new Column('deliverypoint.list.scope-date', 'scope_date', true),
    new Column('deliverypoint.list.creation-date', 'created_at', false),
    new Column('deliverypoint.list.updated-date', 'updated_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  trackById(index, item): number {
    return item.id;
  }

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }
}
