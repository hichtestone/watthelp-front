import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from './table/table.component';
import {ReportAnalysisService} from '../../service/report-analysis.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {ReportAnalysisInterface} from '../../model/report-analysis.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Paginator} from '../../../core/model/paginator.model';
import {InvoiceInterface} from '../../../invoice/model/invoice/invoice.interface';
import {InvoiceService} from '../../../invoice/service/invoice.service';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {AclService} from '../../../core/service/acl.service';
import {Permission} from '../../../role/model/permission/permission-constant';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-report-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  dataSource: ApiDataSource<ReportAnalysisInterface>;
  form: FormGroup;
  invoices: InvoiceInterface[];
  hasResourceAccess: boolean;

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private reportService: ReportAnalysisService,
    private invoiceService: InvoiceService,
    private aclService: AclService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translocoService: TranslocoService,
  ) {
    this.form = this.fb.group({
      invoices: '',
    });
  }

  ngOnInit(): void {
    this.invoiceService.list({
      sort: 'emitted_at',
      sort_order: 'desc',
      filters: {has_analysis: 1}
    }, 'analysis_invoice').subscribe((paginator: Paginator<InvoiceInterface>) => {
      this.invoices = paginator.data;
    });

    this.dataSource = new ApiDataSource<ReportAnalysisInterface>(
      this.reportService,
      this.table.paginator,
      this.table.sort,
      'analysis_invoice'
    );

    this.table.sort.sort({id: 'id', start: 'asc', disableClear: false});

    this.hasResourceAccess = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);

    this.form.controls.invoices.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe((value) => {

        const filterValue = {
          invoices: [value]
        };

        this.filter(filterValue);
      });
  }

  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = form;
    }
  }

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  destroy(): void {
  }

  remove(selection: SelectionModel<ReportAnalysisInterface>): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('report.dialog.deletion.title'),
        description: this.translocoService.translate('report.dialog.deletion.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.reportService.remove(selection, this.dataSource.filter).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('report.dialog.deletion.success'));
              this.dataSource.filter = this.dataSource.filter;
              selection.clear();
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('report.dialog.deletion.error'));
            }
          );
        }
      }
    );

  }
}
