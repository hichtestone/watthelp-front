import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Column} from '../../../../core/table/model/column';
import {ContractInterface} from '../../../model/contract.interface';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';

@Component({
  selector: 'app-contract-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.contract.table';

  @Input() dataSource: ApiDataSource<ContractInterface> | null;

  @Output() deleteSelected = new EventEmitter<number>();

  @Output() applyRow = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('contract.list.reference', 'reference', true),
    new Column('contract.list.price-number', 'nb_pricings', true),
    new Column('contract.list.provider', 'provider', true),
    new Column('contract.list.type', 'type', true),
    new Column('contract.list.invoice-period', 'invoice_period', true),
    new Column('contract.list.started-at', 'started_at', true),
    new Column('contract.list.finished-at', 'finished_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }

  trackById(index, item): number {
    return item.id;
  }

  applyToAll(contractId: number): void {
    this.applyRow.emit(contractId);
  }
}
