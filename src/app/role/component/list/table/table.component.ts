import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {RoleInterface} from '../../../model/role.interface';
import {Column} from '../../../../core/table/model/column';

@Component({
  selector: 'app-role-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective implements OnInit {
  userSettings = 'user_settings.role.table';

  @Input() dataSource: ApiDataSource<RoleInterface> | null;

  @Output() deleteSelected = new EventEmitter<number>();

  @Output() duplicateSelected = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  lengthLimit = 100;

  defaultColumns: Column[] = [
    new Column('common.name', 'name', true),
    new Column('common.description', 'description', true),
    new Column('common.creation-date', 'created_at', true),
    new Column('common.last-update', 'updated_at', true),
    new Column('common.actions', 'actions', true, false)
  ];
}
