import {PricingInterface} from '../../pricing/model/pricing.interface';

export interface ContractInterface {
  id: number;
  reference: string;
  pricings: PricingInterface[];
  provider: string;
  type: string;
  invoice_period: string;
  started_at: string;
  finished_at: string;
}
