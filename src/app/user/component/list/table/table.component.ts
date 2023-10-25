import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {Column} from '../../../../core/table/model/column';
import {StorageService} from '../../../../core/service/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {UserInterface} from '../../../model/user.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.user.table';

  @Input()
  dataSource: ApiDataSource<UserInterface>;

  @Output()
  deleteSelected = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('user.avatar', 'avatar', true),
    new Column('user.first-name', 'first_name', true),
    new Column('user.last-name', 'last_name', true),
    new Column('user.email', 'email', true),
    new Column('user.phone', 'phone', true),
    new Column('user.role', 'role', true),
    new Column('common.actions', 'actions', true, false)
  ];

  constructor(protected dialog: MatDialog, protected storageService: StorageService) {
    super(dialog, storageService);
  }

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }

  trackById(index, item): number {
    return item.id;
  }
}
