import {Component, Input, ViewChild} from '@angular/core';
import {ApiDataSource} from "../../../../../core/datasource/api.datasource";
import {AnomalyInterface} from "../../../../../anomaly/model/anomaly.interface";
import {InvoiceAnomalyTableComponent} from "./invoice-anomaly-table/invoice-anomaly-table.component";
import {Permission} from "../../../../../role/model/permission/permission-constant";
import {ListComponent} from "../../../../../anomaly/component/list/list.component";

@Component({
  selector: 'app-invoice-anomaly-list',
  templateUrl: './invoice-anomaly-list.component.html',
  styleUrls: ['./invoice-anomaly-list.component.scss']
})
export class InvoiceAnomalyListComponent extends ListComponent {

  anomalyDataSource: ApiDataSource<AnomalyInterface> | null;

  @ViewChild('table', {static: true}) table: InvoiceAnomalyTableComponent;

  @Input() anomalyFilter: any;

  ngOnInit(): void {
    this.canDownloadInvoice = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);

    this.anomalyDataSource = new ApiDataSource<AnomalyInterface>(
      this.anomalyService,
      this.table.paginator,
      this.table.sort,
      this.expand
    );
    this.table.sort.sort({id: 'created_at', start: 'asc', disableClear: false});

    this.anomalyDataSource.filter = this.anomalyFilter;
  }
}
