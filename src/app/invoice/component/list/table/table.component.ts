import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiDataSource} from '../../../../core/datasource/api.datasource';
import {InvoiceInterface} from '../../../model/invoice/invoice.interface';
import {Column} from '../../../../core/table/model/column';
import {TableColumnSettingsDirective} from '../../../../core/table/components/table-column-settings.directive';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent extends TableColumnSettingsDirective {
  userSettings = 'user_settings.invoice.table';

  @Input() canDownloadPDF = false;

  @Input() dataSource: ApiDataSource<InvoiceInterface> | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() deleteSelected = new EventEmitter<number>();

  @Output() handlingAnalysis = new EventEmitter<{ id: number, analyzed: boolean, $event: MouseEvent }>();

  @Output() analyzeInvoice = new EventEmitter<any>();

  @Input()
  defaultColumns: Column[] = [
    new Column('common.select', 'select', true, false),
    new Column('common.reference', 'reference', true),
    new Column('common.subs-cta', 'subscription_cta', true),
    new Column('common.cons-cspe-tcfe', 'consumption_cspe_tcfe', true),
    new Column('common.excluding-vat-amount', 'amount_ht', true),
    new Column('common.vat-amount', 'amount_tva', true),
    new Column('common.tax-included-amount', 'amount_ttc', true),
    new Column('common.emitted-at', 'emitted_at', true),
    new Column('common.analysis', 'analysis', true),
    new Column('common.actions', 'actions', true, false)
  ];

  trackById(index, item): number {
    return item.id;
  }

  delete(id: number): void {
    this.deleteSelected.emit(id);
  }

  handleAnalysis(id: number, analyzed: boolean, $event: MouseEvent): void {
    this.handlingAnalysis.emit({id, analyzed, $event});
  }

  analyze(id: number): void {
    this.analyzeInvoice.emit([id]);
    this.selection.clear();
  }

  analyzeAllInvoices(): void {
    if (this.selection.isSelected('*')) {
      this.analyzeInvoice.emit();
      this.selection.clear();
    } else {
      this.analyzeInvoice.emit(this.selection.selected.map(item => item.id));
      this.selection.clear();
    }
  }
}
