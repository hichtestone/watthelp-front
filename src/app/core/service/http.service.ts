import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpServiceInterface} from './http-service.interface';
import {Paginator} from '../model/paginator.model';
import {Observable} from 'rxjs';

export class HttpService<U> implements HttpServiceInterface<any> {

  protected path = '';

  constructor(protected httpClient: HttpClient) {
  }

  static options(apiVersion = null, expandData = null, data = null): any {
    let httpHeaders = new HttpHeaders();
    if (apiVersion) {
      httpHeaders = httpHeaders.set('Accept-Version', apiVersion);
    }
    if (expandData) {
      httpHeaders = httpHeaders.set('X-Expand-Data', expandData);
    }
    return {
      params: data,
      headers: httpHeaders
    };
  }

  list(data, expandData: string = null, apiVersion = null): Observable<any> {
    return this.httpClient.get<Paginator<U>>(this.path, HttpService.options(apiVersion, expandData, data));
  }

  get(id: number, expandData: string = null, apiVersion = null): Observable<any> {
    return this.httpClient.get<U>(this.path + '/' + id, HttpService.options(apiVersion, expandData));
  }

  post(data, expandData: string = null, apiVersion = null): Observable<any> {
    return this.httpClient.post<U>(this.path, data, HttpService.options(apiVersion, expandData));
  }

  put(id, data, expandData: string = null, apiVersion = null): Observable<any> {
    return this.httpClient.put<U>(this.path + '/' + id, data, HttpService.options(apiVersion, expandData));
  }

  patch(id: number, operations): Observable<any> {
    return this.httpClient.patch(this.path + '/' + id, {operations});
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(this.path + '/' + id);
  }
}
