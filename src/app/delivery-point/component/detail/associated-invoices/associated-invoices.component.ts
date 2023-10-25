import {Component, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {SimpleDataSource} from '../../../../core/datasource/simple.datasource';
import {DeliveryPointInterface} from '../../../model/delivery-point.interface';
import {DeliveryPointInvoiceInterface} from '../../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {Router} from '@angular/router';
import {ExpandService} from '../../../../core/table/service/expand.service';

@Component({
  selector: 'app-associated-invoices',
  templateUrl: './associated-invoices.component.html',
  styleUrls: ['./associated-invoices.component.scss']
})
export class AssociatedInvoicesComponent {
  @Input() dataSource: SimpleDataSource | null;
  @Input() paginator: MatPaginator;
  @Input() deliveryPoint: DeliveryPointInterface;

  expandedElement: DeliveryPointInvoiceInterface;

  defaultColumns = [
    'analysis',
    'reference',
    'type',
    'emitted_at',
    'amount_ht',
    'amount_tva',
    'amount_ttc',
    'power_subscribed',
    'status',
    'actions',
    'detail'
  ];

  constructor(private router: Router, private expandService: ExpandService) {
  }

  trackById(index, item): number {
    return item.id;
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

  visualizeInvoice(row): void {
    this.router.navigate(['/delivery-point/' + this.deliveryPoint.id + '/invoice-info/' + row.id]);
  }

  assetColor(isAnAsset: boolean): string {
    return !!isAnAsset ? '#bccdc0' : '';
  }
}
