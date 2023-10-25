import {ContractInterface} from '../../contract/model/contract.interface';
import {DeliveryPointInvoiceInterface} from '../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {FileInterface} from '../../core/model/file.interface';
import {PowerHistoryInterface} from './power-history.interface';
import {DeliveryPointBudgetInterface} from '../../budget/model/delivery-point-budget.interface';

export interface DeliveryPointInterface {
  id: number;
  name: string;
  reference: string;
  code: string;
  delivery_point_invoices: DeliveryPointInvoiceInterface[];
  delivery_point_budgets: DeliveryPointBudgetInterface[];
  address: string;
  latitude: string;
  longitude: string;
  photo: FileInterface;
  contract: ContractInterface;
  description: string;
  meter_reference: string;
  power: string;
  is_in_scope: boolean;
  creation_mode: string;
  created_at: string;
  updated_at: string;
  scope_date: string;
  power_history: PowerHistoryInterface[];
  isVisible: boolean;
}
