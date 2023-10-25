import {AnalysisInterface} from '../invoice/analysis.interface';
import {DeliveryPointInvoiceAnalysisInterface} from './delivery-point-invoice-analysis.interface';
import {AnomalyInterface} from "../../../anomaly/model/anomaly.interface";

export interface ItemAnalysesInterface {
  id: number;
  analyzer: string;
  group: string;
  status: string;
  messages: string[];
  field: string;
  anomaly: AnomalyInterface
  analysis: AnalysisInterface;
  delivery_point_invoice_analysis: DeliveryPointInvoiceAnalysisInterface;
}
