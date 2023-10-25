import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TableComponent} from './table/table.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {InvoiceInterface} from '../../model/invoice/invoice.interface';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {InvoiceService} from '../../service/invoice.service';
import {UploadInvoiceComponent} from '../upload-invoice/upload-invoice.component';
import {ActionUpload} from '../../../core/model/action-upload.model';
import {AclService} from '../../../core/service/acl.service';
import {Permission} from '../../../role/model/permission/permission-constant';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  canDownloadPDF = false;
  dataSource: ApiDataSource<InvoiceInterface> | null;
  form: FormGroup;
  actionImport = new ActionUpload(['management.import.invoice'], 'cloud_upload', 'invoice.upload-invoice');

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private router: Router,
    private aclService: AclService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private translocoService: TranslocoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      reference: '',
      has_analysis: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<InvoiceInterface>(
      this.invoiceService,
      this.table.paginator,
      this.table.sort,
      'invoice_analysis,invoice_pdf,invoice_amount_by_type'
    );

    this.table.sort.sort({id: 'emitted_at', start: 'desc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));

    this.canDownloadPDF = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);
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

  onDelete(id): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('invoice.dialog.deletion.title'),
          description: this.translocoService.translate('invoice.dialog.deletion.description')
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.invoiceService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('invoice.dialog.deletion.success'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }

  openImportDialog(): void {
    this.dialog
      .open(UploadInvoiceComponent)
      .afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.dataSource.filter = this.form.value;
      }
    });
  }

  onHandlingAnalysis(analysisProcess: { id: number; analyzed: boolean; $event: MouseEvent }): void {
    analysisProcess.$event.stopPropagation();
    if (analysisProcess.analyzed) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('invoice.dialog.analysis-handling.title'),
          description: this.translocoService.translate('invoice.dialog.analysis-handling.description'),
          submitButton: this.translocoService.translate('button.analyze')
        }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (!!confirmed) {
          this.launchAnalysis(analysisProcess.id);
        }
      });
    } else {
      this.launchAnalysis(analysisProcess.id);
    }
  }

  launchAnalysis(invoiceId): void {
    this.invoiceService.launchAnalysis(invoiceId).subscribe(
      () => {
        this.dataSource = new ApiDataSource<InvoiceInterface>(
          this.invoiceService,
          this.table.paginator,
          this.table.sort,
          'invoice_analysis,invoice_amount_by_type'
        );

        this.snackbarService.addMessage(this.translocoService.translate('invoice.dialog.analysis-handling.success'));
      },
      () => {
        this.snackbarService.addMessage(this.translocoService.translate('invoice.dialog.analysis-handling.error'));
      }
    );
  }

  onAnalyzeInvoice(id): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('invoice.dialog.analyze-invoice.title'),
        description: this.translocoService.translate('invoice.dialog.analyze-invoice.description'),
        submitButton: this.translocoService.translate('button.yes'),
        cancelButton: this.translocoService.translate('button.no'),
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.invoiceService.analyzeInvoice(id).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('invoice.dialog.analysis-handling.success'));
              this.dataSource.filter = this.dataSource.filter;
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('invoice.dialog.analysis-handling.error'));
            }
          );
        }
      }
    );
  }
}
