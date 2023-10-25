import {InvoiceInterface} from '../../invoice/model/invoice/invoice.interface';
import {ImportInterface} from './import.interface';
import {DeliveryPointInterface} from '../../delivery-point/model/delivery-point.interface';
import {AnomalyInterface} from '../../anomaly/model/anomaly.interface';
import {BudgetInterface} from '../../budget/model/budget.interface';
import {PricingInterface} from '../../pricing/model/pricing.interface';

export interface ImportReportInterface {
  id: number;
  messages: string[];
  status: string;
  import: ImportInterface;
  invoices: InvoiceInterface[];
  delivery_points: DeliveryPointInterface[];
  anomalies: AnomalyInterface[];
  budgets: BudgetInterface[];
  pricings: PricingInterface[];
  created_at: string;
}
