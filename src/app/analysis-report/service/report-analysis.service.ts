import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReportAnalysisInterface} from '../model/report-analysis.interface';
import {Observable} from 'rxjs';
import {Paginator} from '../../core/model/paginator.model';
import {SelectionModel} from "@angular/cdk/collections";

@Injectable({
  providedIn: 'root'
})
export class ReportAnalysisService {
  path = '/invoice/analysis';

  constructor(private httpClient: HttpClient) {
  }

  list(data, expandData: string = null): Observable<Paginator<ReportAnalysisInterface>> {
    let headers = new HttpHeaders();
    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.get<Paginator<ReportAnalysisInterface>>(this.path, {
      headers,
      params: data
    });
  }

  get(id: number, expandData: string = null): Observable<ReportAnalysisInterface> {
    let headers = new HttpHeaders();
    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }

    return this.httpClient.get<ReportAnalysisInterface>(`${this.path}/${id}`, {headers});
  }

  remove(selection: SelectionModel<ReportAnalysisInterface | string>, filters): Observable<any> {
    const data = {
      filters: selection.isSelected('*') ? filters : {ids: selection.selected.map((item: ReportAnalysisInterface) => item.id)}
    };
    return this.httpClient.post(`${this.path}/delete`, data);
  }
}
