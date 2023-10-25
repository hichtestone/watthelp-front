import {DeliveryPointBudgetInterface} from './delivery-point-budget.interface';

export interface BudgetInterface {
  id: number;
  year: number;
  average_price: number;
  total_hours: number;
  total_consumption: number;
  total_amount: number;
  validated: boolean;
  created_at: string;
  updated_at: string;
  previous: BudgetInterface;
  delivery_point_budgets: DeliveryPointBudgetInterface[];
  calculated_quantity: number;
  calculated_amount: number;
}
