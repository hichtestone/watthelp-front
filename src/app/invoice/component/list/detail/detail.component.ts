import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {take} from 'rxjs/operators';
import {InvoiceInterface} from '../../../model/invoice/invoice.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../../service/invoice.service';
import {FileInterface} from '../../../../core/model/file.interface';
import {SnackbarService} from '../../../../core/service/snackbar.service';
import {SimpleDataSource} from '../../../../core/datasource/simple.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {AnomalyService} from '../../../../anomaly/service/anomaly-service';
import {AnalysisInterface} from '../../../model/invoice/analysis.interface';
import {AbstractFormComponent} from '../../../../core/component/abstract-form.component';
import {AclService} from '../../../../core/service/acl.service';
import {Permission} from '../../../../role/model/permission/permission-constant';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends AbstractFormComponent implements OnInit {
  title = 'invoice.breadcrumb.detail';
  form: FormGroup;
  invoice: InvoiceInterface;
  analysis: AnalysisInterface;
  canAccessAlertView: boolean;
  anomalyFilter: any;
  deliveryPointDataSource: SimpleDataSource | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private invoiceService: InvoiceService,
              private aclService: AclService,
              private dialog: MatDialog,
              private anomalyService: AnomalyService,
              private snackbarService: SnackbarService) {
    super();

    this.form = this.fb.group({
      reference: '',
      amount_ht: '',
      amount_tva: '',
      amount_ttc: '',
      emitted_at: '',
      subscription_cta: '',
      consumption_cspe_tcfe: ''
    });
  }

  ngOnInit(): void {
    this.canAccessAlertView = this.aclService.hasAccess(Permission.ANOMALY_VIEW);
    this.deliveryPointDataSource = new SimpleDataSource(this.paginator);

    this.route.data
      .pipe(take(1))
      .subscribe((data: { invoice: InvoiceInterface }) => {
        this.invoice = data.invoice;
        this.analysis = data.invoice.analysis;

        this.deliveryPointDataSource.dataChange.next(this.invoice.delivery_point_invoices);

        this.anomalyFilter = {invoice_reference: this.invoice.reference};

        this.form.patchValue(this.prepareDataToPatch(this.invoice));
      });
  }

  pdfUpload(file: FileInterface): void {
    this.invoiceService.uploadPdf(
      this.invoice.id,
      file ? file.id : null,
      'invoice_pdf')
      .pipe(take(1))
      .subscribe(() => {
          this.snackbarService.addMessage('Le fichier a bien été importé');
        },
        (error) => this.snackbarService.addMessage(this.handleModalError(error))
      );
  }

  prepareDataToPatch(values): any {
    const amountConverter = 10 ** 7;

    return {
      ...values,
      amount_ht: (values.amount_ht / amountConverter),
      amount_tva: (values.amount_tva / amountConverter),
      amount_ttc: (values.amount_ttc / amountConverter),
      subscription_cta: (values.amount_by_type.subscription_cta / amountConverter),
      consumption_cspe_tcfe: (values.amount_by_type.consumption_cspe_tcfe / amountConverter)
    };
  }
}
