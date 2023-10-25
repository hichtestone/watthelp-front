import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Column} from '../../../../core/table/model/column';
import {DeliveryPointBudgetInterface} from '../../../model/delivery-point-budget.interface';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';

@Component({
  selector: 'app-delivery-point-budget-table',
  templateUrl: './delivery-point-budget-table.component.html',
  styleUrls: ['./delivery-point-budget-table.component.scss']
})
export class DeliveryPointBudgetTableComponent extends TableColumnSettingsDirective implements OnInit {
  userSettings = 'user_settings.delivery_point_budget.table';

  @Input() dataSource: ApiDataSource<DeliveryPointBudgetInterface> | null;

  @Output() deleteSelected = new EventEmitter<(number)[]>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('Select', 'select', true, false),
    new Column('Ref. point de livraison', 'reference', true),
    new Column('Dénomination', 'name', true),
    new Column('Adresse', 'address', true),
    new Column('Code interne', 'code', false),
    new Column('Référence du contrat', 'contract_reference', false),
    new Column('Consommation d\'énergie annuelle', 'total_consumption', true),
    new Column('Budget prévisionnel annuel', 'total', true),
    new Column('Dans périmètre', 'is_in_scope', true),
    new Column('Actions', 'actions', true, false)
  ];

  trackById(index, item): number {
    return item.id;
  }


  delete(id: number): void {
    this.deleteSelected.emit([id]);
    this.selection.clear();
  }

  deleteSelection(): void {
    this.deleteSelected.emit(this.selection.selected.map(item => item.id));
    this.selection.clear();
  }
}
