import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {AclService} from '../../../core/service/acl.service';
import {MatDialog} from '@angular/material/dialog';
import {DeliveryPointInvoiceService} from '../../../invoice/service/delivery-point-invoice.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {DeliveryPointInvoiceInterface} from '../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {TableComponent} from './table/table.component';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends AbstractFormComponent implements OnInit {
  dataSource: ApiDataSource<DeliveryPointInvoiceInterface> | null;
  form: FormGroup;

  @ViewChild('table', {static: true}) table: TableComponent;

  expand = [
    'delivery_point_invoice_delivery_point',
    'delivery_point_invoice_invoice',
  ].join(',');

  constructor(
    private snackbarService: SnackbarService,
    private aclService: AclService,
    private deliveryPointInvoiceService: DeliveryPointInvoiceService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translocoService: TranslocoService
  ) {
    super();
    this.form = this.fb.group({
      delivery_point_reference: '',
      delivery_point_name: '',
      invoice_reference: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<DeliveryPointInvoiceInterface>(
      this.deliveryPointInvoiceService,
      this.table.paginator,
      this.table.sort,
      this.expand
    );
  }

  onExportAssetsToExcel(selection: SelectionModel<DeliveryPointInvoiceInterface>): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: this.translocoService.translate('asset.dialog.export-excel.title'),
        description: this.translocoService.translate('asset.dialog.export-excel.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.deliveryPointInvoiceService.exportAssetsToExcel(selection, this.dataSource.filter).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('asset.dialog.export-excel.success'));
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('asset.dialog.export-excel.error'));
            }
          );
        }
      });
  }

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  filter(filters): void {
    if (!!this.dataSource) {
      this.dataSource.filter = filters;
      this.table.paginator.firstPage();
    }
  }
}
