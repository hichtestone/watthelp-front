import {Observable} from 'rxjs';
import {ApiListInterface} from '../model/api-list.interface';

export interface HttpServiceInterface<T> extends ApiListInterface<T> {
  get?(id: number, expandData?: string, apiVersion?: string): Observable<T>;

  post?(data: any, expandData?: string, apiVersion?: string): Observable<T>;

  put?(id: number, data: any, expandData?: string, apiVersion?: string): Observable<T>;

  patch?(id: number, operations: any): Observable<T>;

  delete?(id: number): Observable<T>;
}
