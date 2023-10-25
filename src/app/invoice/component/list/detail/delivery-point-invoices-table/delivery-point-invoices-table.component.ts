import {Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {SimpleDataSource} from '../../../../../core/datasource/simple.datasource';
import {DeliveryPointInvoiceInterface} from "../../../../model/delivery-point-invoice/delivery-point-invoice-interface";
import {ExpandService} from "../../../../../core/table/service/expand.service";

@Component({
  selector: 'app-delivery-point-invoices-table',
  templateUrl: './delivery-point-invoices-table.component.html',
  styleUrls: ['./delivery-point-invoices-table.component.scss']
})
export class DeliveryPointInvoicesTableComponent {
  @Input() dataSource: SimpleDataSource | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  expandedElement: DeliveryPointInvoiceInterface;

  displayedColumns = [
    'name',
    'reference',
    'address',
    'subscription_started_at',
    'subscription_finished_at',
    'type',
    'amount_ht',
    'amount_ttc',
    'status',
    'action'
  ];

  constructor(private expandService: ExpandService) {
  }

  toggleExpand(row: DeliveryPointInvoiceInterface): void {
    if (this.expandedElement === row) {
      this.expandService.currentExpandedChange.next(null);
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
      this.expandService.currentExpandedChange.next(row);
    }
  }

  isExpanded(row: DeliveryPointInvoiceInterface): boolean {
    return this.expandedElement === row;
  }
}
