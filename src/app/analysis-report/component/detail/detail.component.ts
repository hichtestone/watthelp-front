import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReportAnalysisInterface} from '../../model/report-analysis.interface';
import {ExpandService} from '../../../core/table/service/expand.service';
import {MatPaginator} from '@angular/material/paginator';
import {DeliveryPointInvoiceInterface} from '../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-report-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  dataSource: MatTableDataSource<DeliveryPointInvoiceInterface>;
  expandedElement: DeliveryPointInvoiceInterface;

  @Input() reportAnalysis: ReportAnalysisInterface;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  defaultColumns = [
    'name',
    'reference',
    'address',
    'status',
    'detail'
  ];

  constructor(private expandService: ExpandService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.reportAnalysis.invoice.delivery_point_invoices);
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

}
