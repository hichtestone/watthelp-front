import {Component, OnInit, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImportReportInterface} from '../../model/import-report.interface';
import {InvoiceInterface} from '../../../invoice/model/invoice/invoice.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DeliveryPointInterface} from '../../../delivery-point/model/delivery-point.interface';
import {Column} from '../../../core/table/model/column';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {AnomalyInterface} from '../../../anomaly/model/anomaly.interface';
import {TableDataSource} from '../../../core/table/datasource/table-datasource';
import {BudgetInterface} from '../../../budget/model/budget.interface';
import {InvoiceService} from '../../../invoice/service/invoice.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {ImportInterface} from '../../model/import.interface';
import {PricingInterface} from '../../../pricing/model/pricing.interface';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  dataSource: MatTableDataSource<InvoiceInterface>;
  deliveryPointDataSource: DataSource<DeliveryPointInterface> | null;
  anomalyDataSource = new TableDataSource<AnomalyInterface>([]);
  reimportInvoiceDataSource = new TableDataSource<InvoiceInterface>([]);
  budgetDataSource: DataSource<BudgetInterface> | null;
  pricingDataSource: DataSource<PricingInterface> | null;
  importReport: ImportReportInterface;

  defaultColumns = [
    'reference',
    'amount_ht',
    'amount_tva',
    'amount_ttc',
    'emitted_at',
    'analysis'
  ];

  deliveryPointsColumns: Column[] = [
    new Column('deliverypoint.list.reference-rae', 'reference', true),
    new Column('deliverypoint.list.internal-code', 'code', true),
    new Column('deliverypoint.list.address', 'address', true),
    new Column('deliverypoint.list.contract-reference', 'contract_reference', true),
    new Column('deliverypoint.list.in-scope', 'is_in_scope', true),
    new Column('deliverypoint.list.scope-date', 'scope_date', true),
    new Column('deliverypoint.list.creation-date', 'created_at', false),
    new Column('deliverypoint.list.updated-date', 'updated_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  budgetColumns: Column[] = [
    new Column('Année', 'year', true),
    new Column('Consommation annuelle', 'total_consumption', true),
    new Column('Budget prévisionnel annuel', 'total_amount', true),
    new Column('Consommation calculée', 'calculated_quantity', true),
    new Column('Budget consommé calculé', 'calculated_amount', true),
    new Column('Prix moyen de l\'énergie HT', 'average_price', true),
  ];

  pricingColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.name', 'name', true),
    new Column('common.type', 'type', true),
    new Column('common.started-at', 'started_at', true),
    new Column('common.finished-at', 'finished_at', true),
    new Column('common.actions', 'actions', true, false)
  ];


  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  constructor(private router: Router,
              private invoiceService: InvoiceService,
              private snackbarService: SnackbarService,
              private dialog: MatDialog,
              private translocoService: TranslocoService,
              private route: ActivatedRoute) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    this.route.data
      .pipe(take(1))
      .subscribe((data: { importReport: ImportReportInterface }) => {
        this.importReport = data.importReport;
        this.dataSource = new MatTableDataSource(this.importReport.invoices);
        this.deliveryPointDataSource = new MatTableDataSource(this.importReport.delivery_points);
        this.budgetDataSource = new MatTableDataSource(this.importReport.budgets);
        this.pricingDataSource = new MatTableDataSource(this.importReport?.pricings);
        this.anomalyDataSource.setTabValues(this.importReport.anomalies);
        this.reimportInvoiceDataSource.setTabValues(this.importReport.invoices);
      });
  }

  trackById(index, item): number {
    return item.id;
  }

  onReimportInvoice(selection: SelectionModel<InvoiceInterface>, importData: ImportInterface): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent,
      {
        width: '360px',
        data: {
          title: this.translocoService.translate('import.dialog.import.title'),
          description: this.translocoService.translate('import.dialog.import.description'),
          submitButton: this.translocoService.translate('button.yes'),
          cancelButton: this.translocoService.translate('button.no')
        }
      });

    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.invoiceService.import(this.prepareDataToSend(selection, importData)).subscribe(() => {
            this.snackbarService.addMessage(this.translocoService.translate('import.dialog.import.sucess'),
            );
            selection.clear();
            dialogRef.close();
          },
          error => this.snackbarService.addMessage(this.translocoService.translate('import.dialog.import.error'))
        );
      }
    });
  }

  prepareDataToSend(selection: SelectionModel<InvoiceInterface>, importData): any {

    const reimportInvoices = selection.selected.map((item: InvoiceInterface) => item?.reference);

    return {
      file: importData.file?.id,
      provider: importData.provider,
      reimport_invoices: reimportInvoices
    };
  }
}
