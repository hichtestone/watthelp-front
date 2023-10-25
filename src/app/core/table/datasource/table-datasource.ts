import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export class TableDataSource<T> extends MatTableDataSource<T> {
  loading = false;
  total = 0;

  constructor(
    private defaultData: T[] = [],
    private sprintPaginator: MatPaginator = null,
    private sprintSort: MatSort = null
  ) {
    super();
    this.data = defaultData;
    this.paginator = sprintPaginator;
    this.sort = sprintSort;
    this.total = defaultData.length;
  }

  setTabValues(data): void {
    this.data = data;
    this.total = data.length;
  }
}
