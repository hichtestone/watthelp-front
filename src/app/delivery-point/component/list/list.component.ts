import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TableComponent} from './table/table.component';
import {DeliveryPointService} from '../../service/delivery-point.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {DeliveryPointInterface} from '../../model/delivery-point.interface';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogContractAssignementComponent} from '../dialog-contract-assignement/dialog-contract-assignement.component';
import {ActionLink} from '../../../core/model/action-link.model';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {ContractService} from '../../../contract/service/contract.service';
import {ActionUpload} from '../../../core/model/action-upload.model';
import {UploadDialogComponent} from '../../../core/component/upload-perimeter/upload-dialog.component';
import {enumToArray} from '../../../core/enum/enum-converter';
import {InvoicePeriodEnum} from '../../../contract/model/invoice-period.enum';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-delivery-point-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  dataSource: ApiDataSource<DeliveryPointInterface> | null;
  actionLink = new ActionLink('/delivery-point/new', ['management.delivery_point.edit'], 'add', 'deliverypoint.add-new-item');
  actionImport = new ActionUpload(['management.import.scope'], 'cloud_upload', 'deliverypoint.import-new-scope');

  @ViewChild('table', {static: true}) table: TableComponent;

  form: FormGroup;
  noInvoicePeriods = enumToArray(InvoicePeriodEnum);

  constructor(
    private deliveryPointService: DeliveryPointService,
    private contractService: ContractService,
    private dialog: MatDialog,
    private translocoService: TranslocoService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      reference: '',
      code: '',
      contract: '',
      is_in_scope: '',
      no_invoice_for_months: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<DeliveryPointInterface>(
      this.deliveryPointService,
      this.table.paginator,
      this.table.sort,
      'delivery_point_contract,delivery_point_photo'
    );

    this.table.sort.sort({id: 'reference', start: 'asc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));
  }

  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = this.prepareFilter(form);
      this.table.paginator.firstPage();
    }
  }

  prepareFilter(values): any {
    return {
      ...values,
      contract: !!values.contract ? values.contract.id : null
    };
  }

  exportExcel(selection: SelectionModel<DeliveryPointInterface>): void {
    this.deliveryPointService.exportExcel(selection, this.dataSource.filter)
      .pipe(take(1))
      .subscribe(() => {
          this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.snack-bar.export.success'));
          selection.clear();
        },
        () => this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.snack-bar.export.error')));
  }

  assignContractEvent(selection: SelectionModel<DeliveryPointInterface>): void {
    const dialogRef = this.dialog.open(DialogContractAssignementComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('deliverypoint.dialog.assign.title')
      }
    });

    dialogRef.afterClosed()
      .subscribe((contractId: number) => {
        if (!!contractId) {
          const filters = this.dataSource.filter;
          if (!!selection) {
            filters.id = selection;
          }
          this.deliveryPointService.assign(contractId, {filters})
            .pipe(take(1))
            .subscribe(() => {
                this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.snack-bar.assign.success'));
                selection.clear();
                this.dataSource.filter = {};
              },
              () => this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.snack-bar.assign.error')));
        }
      });
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
          title: this.translocoService.translate('deliverypoint.dialog.deletion.title'),
          description: this.translocoService.translate('deliverypoint.dialog.deletion.description')
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.deliveryPointService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.delivery-point-deleted'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }

  openImportDialog(): void {
    this.dialog
      .open(UploadDialogComponent, {
        data: {
          title: this.translocoService.translate('deliverypoint.import-new-scope'),
          service: this.deliveryPointService,
        }
      })
      .afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.dataSource.filter = this.dataSource.filter;
      }
    });
  }
}
