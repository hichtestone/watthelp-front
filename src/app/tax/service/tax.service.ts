import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {TaxInterface} from '../model/tax-interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService extends HttpService<TaxInterface> {
  path = '/tax';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getAmountStats(data: any): Observable<any> {
    return this.httpClient.get('/stats/amounts', {params: data});
  }
}
