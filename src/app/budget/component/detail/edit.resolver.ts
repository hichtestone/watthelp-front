import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BudgetInterface} from '../../model/budget.interface';
import {BudgetService} from '../../service/budget.service';

@Injectable()
export class BudgetEditResolver implements Resolve<BudgetInterface> {
  constructor(private budgetService: BudgetService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BudgetInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);
    const expand = [
      'previous_budget',
      'calculated_info',
      'budget_delivery_point_budgets',
      'delivery_point_budget_delivery_point'
    ].join(',');

    return this.budgetService.get(id, expand).pipe(map(budget => {
      if (budget) {
        return budget;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
