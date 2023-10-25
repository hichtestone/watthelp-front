import {BehaviorSubject, merge as observableMerge, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/table';
import {Paginator} from '../model/paginator.model';
import {map, switchMap, take} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiListInterface} from '../model/api-list.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';

export class ApiDataSource<T> extends DataSource<T> {
  loading = true;
  total = 0;
  data: T[];
  filterChange = new BehaviorSubject({});

  constructor(
    protected service: ApiListInterface<T>,
    protected paginator: MatPaginator = null,
    protected sort: MatSort = null,
    protected expand = null,
    protected defaultSort = 'id',
    protected defaultOrderBy = 'asc'
  ) {
    super();
  }

  get filter(): any {
    return this.filterChange.value;
  }

  set filter(filter: any) {
    this.filterChange.next(filter);
  }

  connect(): Observable<T[]> {
    const displayDataChanges = [
      this.filterChange,
      this.paginator.page,
      this.sort.sortChange
    ];

    return observableMerge(...displayDataChanges)
      .pipe(
        untilDestroyed(this, 'disconnect'),
        switchMap(() => {
          this.loading = true;

          const data = {
            page: this.paginator.pageIndex + 1,
            per_page: this.paginator.pageSize,
            sort: this.defaultSort,
            sort_order: this.defaultOrderBy,
            filters: this.filter
          };

          if (this.sort.active) {
            data.sort = this.sort.active;
            data.sort_order = this.sort.direction;
          }

          return this.service.list(data, this.expand).pipe(
            take(1),
            map((response: Paginator<T>) => {
              this.total = response.count;
              this.loading = false;
              this.data = response.data;

              return response.data;
            }));
        })
      );
  }

  disconnect(): void {
  }
}
