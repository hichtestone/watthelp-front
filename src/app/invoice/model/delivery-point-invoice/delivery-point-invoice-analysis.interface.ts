import {ItemAnalysesInterface} from './item-analyses.interface';
import {DeliveryPointInvoiceInterface} from './delivery-point-invoice-interface';

export interface DeliveryPointInvoiceAnalysisInterface {
  id: number;
  status: string;
  item_analyses: ItemAnalysesInterface[];
  delivery_point_invoice: DeliveryPointInvoiceInterface;
}
