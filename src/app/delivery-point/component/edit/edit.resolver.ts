import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DeliveryPointInterface} from '../../model/delivery-point.interface';
import {DeliveryPointService} from '../../service/delivery-point.service';

@Injectable()
export class DeliveryPointEditResolver implements Resolve<DeliveryPointInterface> {
  expandData = [
    'delivery_point_contract',
    'delivery_point_delivery_point_invoices',
    'delivery_point_invoice_invoice',
    'invoice_analysis',
    'delivery_point_invoice_invoice_consumption',
    'delivery_point_invoice_invoice_subscription',
    'delivery_point_invoice_invoice_taxes',
    'delivery_point_invoice_delivery_point_invoice_analysis',
    'delivery_point_invoice_analysis_item_analyses',
    'delivery_point_photo',
    'delivery_point_delivery_point_budgets',
    'delivery_point_budget_budget',
    'item_analysis_anomaly',
    'power_history'
  ].join(',');

  constructor(private deliveryPointService: DeliveryPointService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeliveryPointInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.deliveryPointService.get(id, this.expandData).pipe(map(deliveryPoint => {
      if (deliveryPoint) {
        return deliveryPoint;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
