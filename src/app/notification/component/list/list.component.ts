import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {TableComponent} from './table/table.component';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {NotificationInterface} from '../../model/notification.interface';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title = 'notification.breadcrumb.title';

  dataSource: ApiDataSource<NotificationInterface> | null;

  @ViewChild('table', {static: true}) table: TableComponent;

  selection = new SelectionModel<number | string>(true, []);

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private translocoService: TranslocoService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<NotificationInterface>(
      this.notificationService,
      this.table.paginator,
      this.table.sort);

    this.table.sort.sort({id: 'created_at', start: 'desc', disableClear: false});
  }

  onMarkAsRead(notification: NotificationInterface): void {
    const op = !!notification ? notification.id : '*';

    const operations = [{op: 'replace', path: '/read', value: true}];
    this.notificationService.patch(op, operations).subscribe(
      () => {
        if (!!notification) {
          notification.is_read = true;
        } else {
          this.dataSource.data.map(item => item.is_read = true);
        }
      },
      () => {
      }
    );
  }

  onDelete(ids): void {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('notification.dialog.delete.title'),
        description: this.translocoService.translate('notification.dialog.delete.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.notificationService.removeNotification(ids).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('notification.dialog.delete.success'));
              this.dataSource.filter = this.dataSource.filter;
              this.selection.clear();
              this.notificationService.notificationDeleted.next(ids);
            },
            () => this.snackbarService.addMessage(this.translocoService.translate('notification.dialog.delete.error')));
        }
      }
    );
  }
}
