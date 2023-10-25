import {Injectable} from '@angular/core';
import {HttpService} from '../../core/service/http.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DeliveryPointBudgetInterface} from '../model/delivery-point-budget.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPointBudgetService extends HttpService<DeliveryPointBudgetInterface> {
  path = '/budget';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  list(filters: any, expandData: string = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.get<DeliveryPointBudgetInterface>(`${this.path}/delivery-point-budget`,
      {
        headers,
        params: filters
      });
  }
}
