import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TableComponent} from './table/table.component';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ApiDataSource} from '../../../../../core/datasource/api.datasource';
import {enumToArray} from '../../../../../core/enum/enum-converter';
import {InvoicePeriodEnum} from '../../../../../contract/model/invoice-period.enum';
import {ContractService} from '../../../../../contract/service/contract.service';
import {SnackbarService} from '../../../../../core/service/snackbar.service';
import {DeliveryPointService} from '../../../../../delivery-point/service/delivery-point.service';
import {DeliveryPointInterface} from '../../../../../delivery-point/model/delivery-point.interface';

@Component({
  selector: 'app-dialog-delivery-point-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  dataSource: ApiDataSource<DeliveryPointInterface> | null;

  @Output() validateSelection = new EventEmitter<{ selection: SelectionModel<DeliveryPointInterface | string>, delivery_point_filters: any, total: number }>();

  @ViewChild('table', {static: true}) table: TableComponent;

  form: FormGroup;
  noInvoicePeriods = enumToArray(InvoicePeriodEnum);

  constructor(
    private deliveryPointService: DeliveryPointService,
    private contractService: ContractService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      reference: '',
      code: '',
      is_in_scope: '',
      no_invoice_for_months: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<DeliveryPointInterface>(
      this.deliveryPointService,
      this.table.paginator,
      this.table.sort
    );

    this.table.sort.sort({id: 'reference', start: 'asc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));
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

  onValidateSelection(selection: SelectionModel<DeliveryPointInterface | string>): void {
    this.validateSelection.emit({
      selection,
      delivery_point_filters: this.dataSource.filter,
      total: this.dataSource.total
    });
  }
}
