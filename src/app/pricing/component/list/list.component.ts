import {Component, OnInit, ViewChild} from '@angular/core';
import {PricingService} from '../../service/pricing.service';
import {TableComponent} from './table/table.component';
import {ActionLink} from '../../../core/model/action-link.model';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PricingInterface} from '../../model/pricing.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {take} from 'rxjs/operators';
import {TranslocoService} from '@ngneat/transloco';
import {ActionUpload} from '../../../core/model/action-upload.model';
import {SelectionModel} from '@angular/cdk/collections';
import {UploadDialogComponent} from '../../../core/component/upload-perimeter/upload-dialog.component';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource: ApiDataSource<PricingInterface>;
  actionLink = new ActionLink('/pricing/new', ['system.pricing.edit'], 'add', 'pricing.add-new');
  actionImport = new ActionUpload(['system.pricing.import'], 'cloud_upload', 'pricing.breadcrumb.import');
  form: FormGroup;
  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private pricingService: PricingService,
    private snackbarService: SnackbarService,
    private translocoService: TranslocoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      name: '',
      type: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<PricingInterface>(this.pricingService, this.table.paginator, this.table.sort, 'pricing_import_reports');

    this.table.sort.sort({id: 'started_at', start: 'asc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));
  }

  onDelete(id): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('pricing.dialog.deletion.title'),
          description: this.translocoService.translate('pricing.dialog.deletion.description')
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.pricingService.delete(id).pipe(take(1)).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('pricing.dialog.deletion.success'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }

  onExportPricingToExcel(selection: SelectionModel<PricingInterface>): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: this.translocoService.translate('pricing.dialog.excel.title'),
        description: this.translocoService.translate('pricing.dialog.excel.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.pricingService.exportPricingToExcel(selection, this.dataSource.filter).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('dialog-excel.success'));
              selection.clear();
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('dialog-excel.error'));
            }
          );
        }
      });
  }

  openImportDialog(): void {
    this.dialog
      .open(UploadDialogComponent, {
        data: {
          title: this.translocoService.translate('pricing.import-label'),
          service: this.pricingService,
        }
      })
      .afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.dataSource.filter = this.dataSource.filter;
      }
    });
  }

  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = form;
      this.table.paginator.firstPage();
    }
  }

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  destroy(): void {
  }
}
