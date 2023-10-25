import {Component} from '@angular/core';
import {TableComponent} from "../../../../../../anomaly/component/list/table/table.component";

@Component({
  selector: 'app-invoice-anomaly-table',
  templateUrl: '../../../../../../anomaly/component/list/table/table.component.html',
  styleUrls: ['../../../../../../anomaly/component/list/table/table.component.scss']
})
export class InvoiceAnomalyTableComponent extends TableComponent {
  userSettings = 'user_settings.invoice_anomaly.table';
}
