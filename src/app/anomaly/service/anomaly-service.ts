import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {HttpService} from '../../core/service/http.service';
import {AnomalyInterface} from '../model/anomaly.interface';
import {SelectionModel} from "@angular/cdk/collections";

@Injectable({
  providedIn: 'root'
})
export class AnomalyService extends HttpService<AnomalyInterface> {
  path = '/invoice/anomaly';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  remove(selection: SelectionModel<AnomalyInterface | string>, filters): Observable<any> {
    const data = {
      filters: selection.isSelected('*') ? filters : {id: selection.selected.map((item: AnomalyInterface) => item.id)}
    };
    return this.httpClient.post(`${this.path}/delete`, data);
  }

  getAnomaliesStats(): Observable<any> {
    return this.httpClient.get<any>('/stats/anomaly');
  }

  exportAnomaliesToExcel(selection: SelectionModel<AnomalyInterface | string>, filters): Observable<any> {
    const data = {
      filters: selection.isSelected('*') ? filters : {id: selection.selected.map((item: AnomalyInterface) => item.id)}
    };
    return this.httpClient.post(this.path + '/export', data);
  }
}
