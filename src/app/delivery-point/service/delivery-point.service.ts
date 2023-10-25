import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/service/http.service';
import {DeliveryPointInterface} from '../model/delivery-point.interface';
import {SelectionModel} from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPointService extends HttpService<DeliveryPointInterface> {
  path = '/delivery-point';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  assign(id: number, filters): Observable<DeliveryPointInterface> {
    return this.httpClient.post<DeliveryPointInterface>(this.path + '/contract/' + id + '/assign', filters);
  }

  getGlobalStats(): Observable<any> {
    return this.httpClient.get<any>('/stats/count');
  }

  exportExcel(selection: SelectionModel<DeliveryPointInterface | string>, filters): Observable<any> {
    const data = {
      filters: this.mergeSelectionAndFilter(selection, filters)
    };
    return this.httpClient.post(this.path + '/export', data);
  }

  import(data: any): Observable<any> {
    return this.httpClient.post(`${this.path}/import`, data);
  }

  mergeSelectionAndFilter(selection: SelectionModel<DeliveryPointInterface | string>, filters)
    : SelectionModel<DeliveryPointInterface | string> {
    return selection.isSelected('*') ? filters : {ids: selection.selected.map((item: DeliveryPointInterface) => item.id)};
  }
}
