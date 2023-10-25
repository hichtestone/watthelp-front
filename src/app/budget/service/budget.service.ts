import {Injectable} from '@angular/core';
import {HttpService} from '../../core/service/http.service';
import {BudgetInterface} from '../model/budget.interface';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DeliveryPointBudgetInterface} from '../model/delivery-point-budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends HttpService<BudgetInterface> {
  path = '/budget';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  removeBudget(ids: number[]): Observable<any> {
    return this.httpClient.post(this.path + '/delete', {ids});
  }

  exportBudgetToExcel(ids: number[]): Observable<any> {
    const data = {
      filters: {ids}
    };
    return this.httpClient.post(this.path + '/export', data);
  }

  getDeliveryPointBudgetById(budgetId: number, deliveryPointBudgetId: number, expandData: string = null): Observable<DeliveryPointBudgetInterface> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.get<DeliveryPointBudgetInterface>(this.path + '/' + budgetId + '/delivery-point-budget/' + deliveryPointBudgetId, {headers});
  }

  updateDeliveryPointBudget(budgetId: number, deliveryPointBudgetId: number, data): Observable<DeliveryPointBudgetInterface> {
    return this.httpClient.put<DeliveryPointBudgetInterface>(this.path + '/' + budgetId + '/delivery-point-budget/' + deliveryPointBudgetId, data);
  }

  removeDeliveryPointBudget(budgetId: number, ids: number[]): Observable<any> {
    return this.httpClient.post(this.path + '/' + budgetId + '/delivery-point-budget', {ids});
  }

  import(data: any): Observable<any> {
    return this.httpClient.post(`${this.path}/import`, data);
  }

  getBudgetStats(year: any): Observable<any> {
    return this.httpClient.get<any>('/stats/budget', {params: {year}});
  }
}
