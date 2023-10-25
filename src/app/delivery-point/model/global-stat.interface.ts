import {DeliveryPointStatsInterface} from './delivery-point-stats.interface';

export interface GlobalStatInterface {
  invoices: number;
  anomalies: number;
  delivery_points: DeliveryPointStatsInterface;
}
