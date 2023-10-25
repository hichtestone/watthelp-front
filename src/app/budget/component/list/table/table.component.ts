import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BudgetInterface} from '../../../model/budget.interface';
import {Column} from '../../../../core/table/model/column';

@Component({
  selector: 'app-budget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.budget.table';

  @Input() dataSource: ApiDataSource<BudgetInterface> | null | any;

  @Input() isDisplayActions = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() exportExcel = new EventEmitter<(number)[]>();

  @Output() deleteSelected = new EventEmitter<(number)[]>();

  @Input()
  defaultColumns: Column[] = [
    new Column('Select', 'select', true, false),
    new Column('Année', 'year', true),
    new Column('Consommation annuelle', 'total_consumption', true),
    new Column('Budget prévisionnel annuel', 'total_amount', true),
    new Column('Consommation calculée', 'calculated_quantity', true),
    new Column('Budget consommé calculé', 'calculated_amount', true),
    new Column('Prix moyen de l\'énergie HT', 'average_price', true),
    new Column('Actions', 'actions', true, false)
  ];


  exportBudgetToExcel(): void {
    if (this.selection.isSelected('*')) {
      this.exportExcel.emit();
    } else {
      this.exportExcel.emit(this.selection.selected.map(item => item.id));
    }
  }

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
