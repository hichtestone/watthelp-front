import {BudgetInterface} from './budget.interface';
import {DeliveryPointInterface} from '../../delivery-point/model/delivery-point.interface';

export interface DeliveryPointBudgetInterface {
  id: number;
  previous: DeliveryPointBudgetInterface;
  delivery_point: DeliveryPointInterface;
  budget: BudgetInterface;
  installed_power: number;
  equipment_power_percentage: number;
  gradation: number;
  gradation_hours: number;
  sub_total_consumption: number;
  renovation: boolean;
  renovated_at: string;
  new_installed_power: number;
  new_equipment_power_percentage: number;
  new_gradation: number;
  new_gradation_hours: number;
  new_sub_total_consumption: number;
  total_consumption: number;
  total: number;
}
