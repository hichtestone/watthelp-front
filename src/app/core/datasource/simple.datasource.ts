import {MatPaginator} from '@angular/material/paginator';
import {map} from 'rxjs/operators';
import {BehaviorSubject, merge as observableMerge, Observable} from 'rxjs';

import {DataSource} from '@angular/cdk/collections';

export class SimpleDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private paginator: MatPaginator) {
    super();
  }

  get data(): any[] {
    if (this.dataChange.value) {
      return this.dataChange.value;
    }
    return [];
  }

  connect(): Observable<any[]> {
    const displayDataChanges: Array<any> = [this.dataChange];
    if (this.paginator) {
      displayDataChanges.push(this.paginator.page);
    }

    return observableMerge(...displayDataChanges).pipe(
      map(() => {
        if (this.paginator) {
          const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
          return this.data.slice().splice(startIndex, this.paginator.pageSize);
        } else {
          return this.data.slice();
        }
      })
    );
  }

  disconnect(): void {
  }
}
