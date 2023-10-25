import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {PricingInterface} from '../model/pricing.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService extends HttpService<PricingInterface> {
  path = '/pricing';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  exportPricingToExcel(selection: SelectionModel<PricingInterface | string>, filters): Observable<any> {
    const data = {
      filters: selection.isSelected('*') ? filters : {id: selection.selected.map((item: PricingInterface) => item.id)}
    };
    return this.httpClient.post(`${this.path}/export`, data);
  }

  import(data: any): Observable<any> {
    return this.httpClient.post(`${this.path}/import`, data);
  }
}
