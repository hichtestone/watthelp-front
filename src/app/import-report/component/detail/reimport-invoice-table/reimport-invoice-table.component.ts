import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {TableDataSource} from '../../../../core/table/datasource/table-datasource';
import {InvoiceInterface} from '../../../../invoice/model/invoice/invoice.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {Column} from '../../../../core/table/model/column';

@Component({
  selector: 'app-reimport-invoice-table',
  templateUrl: './reimport-invoice-table.component.html',
  styleUrls: ['./reimport-invoice-table.component.scss']
})
export class ReimportInvoiceTableComponent extends TableColumnSettingsDirective implements OnInit {

  @Input() dataSource: TableDataSource<InvoiceInterface> | null;

  @Output() reimportInvoice = new EventEmitter<SelectionModel<InvoiceInterface>>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.reference', 'reference', true),
    new Column('common.excluding-vat-amount', 'amount_ht', true),
    new Column('common.vat-amount', 'amount_tva', true),
    new Column('common.tax-included-amount', 'amount_ttc', true),
    new Column('common.emitted-at', 'emitted_at', true),
    new Column('common.actions', 'actions', true, false)
  ];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
