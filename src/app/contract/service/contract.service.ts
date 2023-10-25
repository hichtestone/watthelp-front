import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {ContractInterface} from '../model/contract.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends HttpService<ContractInterface> {
  path = '/contract';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  refer(id: number): Observable<ContractInterface> {
    return this.httpClient.post<ContractInterface>(this.path + '/' + id + '/refer', {});
  }
}
