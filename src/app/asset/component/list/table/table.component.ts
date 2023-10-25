import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {DeliveryPointInvoiceInterface} from '../../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Column} from '../../../../core/table/model/column';

@Component({
  selector: 'app-asset-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.delivery_point_invoice_asset.table';

  @Input() dataSource: ApiDataSource<DeliveryPointInvoiceInterface> | null;

  @Output() exportExcel = new EventEmitter<SelectionModel<DeliveryPointInvoiceInterface>>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('asset.list.invoice-reference', 'reference', true),
    new Column('common.dp-ref', 'delivery_point_ref', true),
    new Column('common.dp-name', 'delivery_point_name', true),
    new Column('common.delivery_point_invoice.power_subscribed', 'power_subscribed', true),
    new Column('common.excluding-vat-amount', 'amount_ht', true),
    new Column('common.vat-amount', 'amount_tva', true),
    new Column('common.tax-included-amount', 'amount_ttc', true),
    new Column('common.statement-type', 'type', true),
    new Column('common.actions', 'actions', true, false)
  ];
}
