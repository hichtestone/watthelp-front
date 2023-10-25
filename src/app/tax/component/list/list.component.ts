import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionLink} from '../../../core/model/action-link.model';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {TaxInterface} from '../../model/tax-interface';
import {TableComponent} from './table/table.component';
import {TaxService} from '../../service/tax.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource: ApiDataSource<TaxInterface>;
  actionLink = new ActionLink('/tax/new', ['system.tax.edit'], 'add', 'tax.create-tax');

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private taxService: TaxService,
    private snackbarService: SnackbarService,
    private translocoService: TranslocoService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<TaxInterface>(
      this.taxService,
      this.table.paginator,
      this.table.sort
    );

    this.table.sort.sort({id: 'id', start: 'asc', disableClear: false});
  }

  onDelete(id): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('tax.dialog.deletion.title'),
          description: this.translocoService.translate('tax.dialog.deletion.description')
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.taxService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('tax.dialog.deletion.success'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }
}
