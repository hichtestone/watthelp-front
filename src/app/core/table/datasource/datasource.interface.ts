import {Observable} from 'rxjs';

export interface DataSourceInterface {
  loading: boolean;
  total: number;
  data: Array<any>;
  filter?: any;

  connect(): Observable<any[]>;

  init?(): any;

  disconnect(): void;
}
