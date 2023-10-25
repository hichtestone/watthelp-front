import {ItemAnalysesInterface} from '../../invoice/model/delivery-point-invoice/item-analyses.interface';
import {InvoiceInterface} from '../../invoice/model/invoice/invoice.interface';
import {DeliveryPointInvoiceAnalysisInterface} from '../../invoice/model/delivery-point-invoice/delivery-point-invoice-analysis.interface';

export interface ReportAnalysisInterface {
  id: number;
  delivery_point_invoice_analyses: DeliveryPointInvoiceAnalysisInterface[];
  item_analyses: ItemAnalysesInterface[];
  invoice: InvoiceInterface;
  status: string;
  created_at: string;
}
