import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {AnomalyInterface} from '../../../model/anomaly.interface';
import {Column} from '../../../../core/table/model/column';
import {StorageService} from '../../../../core/service/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-anomaly-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.anomaly.table';

  @Input() isDisplayActions = true;

  @Input() externalInvoiceRouteAccess = false;

  @Input() canDownloadInvoice: boolean;

  @Input() dataSource: ApiDataSource<AnomalyInterface> | null;

  @Output() deleteSelection = new EventEmitter<SelectionModel<AnomalyInterface>>();

  @Output() exportExcel = new EventEmitter<SelectionModel<AnomalyInterface>>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.invoice', 'invoices', true),
    new Column('common.started-at', 'created_at', false),
    new Column('common.dp-ref', 'delivery_point_ref', true),
    new Column('common.dp-name', 'delivery_point_name', true),
    new Column('common.power', 'power', true),
    new Column('common.address', 'address', true),
    new Column('common.excluding-vat-amount', 'amount_ht', false),
    new Column('common.vat-amount', 'amount_tva', true),
    new Column('common.tax-included-amount', 'amount_ttc', true),
    new Column('common.detail', 'content', false),
    new Column('common.type', 'type', true),
    new Column('common.status', 'status', true),
    new Column('common.difference', 'total', true),
    new Column('common.diff-percentage', 'total_percentage', true),
    new Column('common.profit.label', 'profit', true),
    new Column('common.actions', 'actions', true, false)
  ];

  constructor(protected dialog: MatDialog, protected storageService: StorageService) {
    super(dialog, storageService);
  }
}
