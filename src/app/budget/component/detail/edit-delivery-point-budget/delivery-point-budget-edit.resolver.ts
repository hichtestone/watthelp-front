import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DeliveryPointBudgetInterface} from '../../../model/delivery-point-budget.interface';
import {BudgetService} from '../../../service/budget.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPointBudgetEditResolver implements Resolve<DeliveryPointBudgetInterface> {
  constructor(private budgetService: BudgetService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeliveryPointBudgetInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);
    const deliveryId: number = parseInt(route.paramMap.get('deliveryId'), 10);

    const expand = [
      'previous_delivery_point_budget',
      'delivery_point_budget_budget',
      'previous_budget',
      'delivery_point_budget_delivery_point',
      'calculated_info'
    ].join(',');

    return this.budgetService
      .getDeliveryPointBudgetById(id, deliveryId, expand).pipe(
        map(deliveryPointBudget => {
          if (deliveryPointBudget) {
            return deliveryPointBudget;
          } else {
            this.router.navigate(['../']);
            return null;
          }
        }));
  }
}
