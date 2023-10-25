import {Component, Input, OnInit} from '@angular/core';
import {ReportAnalysisInterface} from "../../../model/report-analysis.interface";
import {DeliveryPointInvoiceAnalysisInterface} from "../../../../invoice/model/delivery-point-invoice/delivery-point-invoice-analysis.interface";
import {ItemAnalysesInterface} from "../../../../invoice/model/delivery-point-invoice/item-analyses.interface";
import {AnalysisInterface} from "../../../../invoice/model/invoice/analysis.interface";

@Component({
  selector: 'app-report-stat',
  templateUrl: './report-stat.component.html',
  styleUrls: ['./report-stat.component.scss']
})
export class ReportStatComponent implements OnInit {
  analysisOk = 0;
  analysisError = 0;
  analysisIgnored = 0;

  @Input() reportAnalysis: ReportAnalysisInterface | AnalysisInterface;

  ngOnInit(): void {

    if (this.reportAnalysis?.delivery_point_invoice_analyses) {
      this.reportAnalysis.delivery_point_invoice_analyses.forEach((deliveryPointAnalysis: DeliveryPointInvoiceAnalysisInterface) => {

        if (deliveryPointAnalysis.item_analyses) {
          deliveryPointAnalysis.item_analyses.forEach((item: ItemAnalysesInterface) => {
            switch (item.status) {
              case 'error':
                this.analysisError++;
                break;
              case 'warning':
                this.analysisIgnored++;
                break;
              case 'ok':
                this.analysisOk++;
                break;
            }
          });
        }
      });
    }
  }
}
