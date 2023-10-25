import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {NotificationInterface} from '../../../model/notification.interface';
import {Column} from '../../../../core/table/model/column';
import {NotificationDataInterface} from '../../../model/notification-data.interface';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {StorageService} from '../../../../core/service/storage.service';
import {NotificationTypeEnum} from '../../../model/notification-type.enum';

@Component({
  selector: 'app-notification-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.notification.table';

  @Input() dataSource: ApiDataSource<NotificationInterface> | null;
  @Input() selection: SelectionModel<any>;

  @Output() deleteSelected = new EventEmitter<any>();
  @Output() markAsReadSelected = new EventEmitter<NotificationInterface>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input()
  defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('notification.message', 'message', true),
    new Column('common.status', 'is_read', true),
    new Column('notification.created-at', 'created_at', true),
    new Column('notification.read-at', 'updated_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  constructor(private router: Router, protected dialog: MatDialog, protected storageService: StorageService) {
    super(dialog, storageService);
  }

  deleteNotification(id: number): void {
    this.deleteSelected.emit([id]);
    this.selection.clear();
  }

  deleteSelection(): void {
    if (this.selection.isSelected('*')) {
      this.deleteSelected.emit('*');
    } else {
      this.deleteSelected.emit(this.selection.selected.map(item => item.id));
    }

  }

  markAsRead(notification: NotificationInterface): void {
    this.markAsReadSelected.emit(notification);
  }

  markAllAsRead(): void {
    this.markAsReadSelected.emit();
  }

  trackById(index, item): number {
    return item.id;
  }

  goToDetail(data: NotificationDataInterface): void {
    switch (data.report_type) {
      case NotificationTypeEnum.INVOICE:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;

      case NotificationTypeEnum.SCOPE:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;

      case NotificationTypeEnum.ANALYSIS:
        this.router.navigate([`/analysis-report/${data.report_id}`]);
        break;

      case NotificationTypeEnum.BUDGET:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;
      case NotificationTypeEnum.PRICING:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;
    }
  }
}
