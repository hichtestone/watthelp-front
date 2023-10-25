import {Observable} from 'rxjs';

export interface ApiFileInterface {
  import(data: any): Observable<any>;
}
