import {InvoiceInterface} from './invoice.interface';
import {ItemAnalysesInterface} from "../delivery-point-invoice/item-analyses.interface";
import {DeliveryPointInvoiceAnalysisInterface} from "../delivery-point-invoice/delivery-point-invoice-analysis.interface";

export interface AnalysisInterface {
  id: number;
  status: string;
  created_at: string;
  invoice: InvoiceInterface;
  delivery_point_invoice_analyses: DeliveryPointInvoiceAnalysisInterface[];
  item_analyses: ItemAnalysesInterface[];
}
