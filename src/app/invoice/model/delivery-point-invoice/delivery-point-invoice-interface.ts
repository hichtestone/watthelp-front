import {DeliveryPointInterface} from '../../../delivery-point/model/delivery-point.interface';
import {InvoiceInterface} from '../invoice/invoice.interface';
import {SubscriptionInterface} from './subscription.interface';
import {ConsumptionInterface} from './consumption.interface';
import {DeliveryPointInvoiceTaxInterface} from './delivery-point-invoice-tax.interface';
import {DeliveryPointInvoiceAnalysisInterface} from './delivery-point-invoice-analysis.interface';

export interface DeliveryPointInvoiceInterface {
  id: number;
  type: string;
  delivery_point: DeliveryPointInterface;
  subscription: SubscriptionInterface;
  consumption: ConsumptionInterface;
  taxes: DeliveryPointInvoiceTaxInterface[];
  invoice: InvoiceInterface;
  amount_ht: number;
  amount_tva: number;
  amount_ttc: number;
  power_subscribed: number;
  delivery_point_invoice_analysis: DeliveryPointInvoiceAnalysisInterface;
}
