import {Observable} from 'rxjs';
import {Paginator} from './paginator.model';

export interface ApiListInterface<T> {
  list(data: any, expandData?: string): Observable<Paginator<T>>;
}
