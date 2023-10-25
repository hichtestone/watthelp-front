import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {Column} from '../../../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../../../core/table/components/table-column-settings.directive';
import {ApiDataSource} from '../../../../../../core/datasource/api.datasource';
import {DeliveryPointInterface} from '../../../../../../delivery-point/model/delivery-point.interface';

@Component({
  selector: 'app-dialog-delivery-point-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent extends TableColumnSettingsDirective {

  @Input() dataSource: ApiDataSource<DeliveryPointInterface> | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() validateSelection = new EventEmitter<SelectionModel<DeliveryPointInterface | string>>();

  @Input()
  defaultColumns: Column[] = [
    new Column('Select', 'select', true, false),
    new Column('Référence RAE', 'reference', true),
    new Column('Code interne', 'code', true),
    new Column('Mode de création', 'creation_mode', true),
    new Column('Dans périmètre', 'is_in_scope', true),
  ];

  trackById(index, item): number {
    return item.id;
  }
}
