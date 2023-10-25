import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {InvoiceInterface} from '../model/invoice/invoice.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends HttpService<InvoiceInterface> {
  path = '/invoice';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  import(data: any): Observable<any> {
    return this.httpClient.post(`${this.path}/import`, data);
  }

  launchAnalysis(id: number): Observable<any> {
    return this.httpClient.post(this.path + '/' + id + '/analysis', []);
  }

  uploadPdf(id: number, pdf: any, expandData: string = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.post(this.path + '/' + id + '/pdf', {pdf}, {headers});
  }

  getConsumptionStats(data: any): Observable<any> {
    return this.httpClient.get('/stats/consumption', {params: data});
  }

  getBudgetComparisonStats(data: any): Observable<any> {
    return this.httpClient.get('/stats/consumption/budget-comparison', {params: data});
  }

  analyzeInvoice(id: (number | string)[]): Observable<any> {
    const data = {
      filters: {id}
    };
    return this.httpClient.post(`${this.path}/analysis`, data);
  }
}
