import {Column} from '../model/column';
import {TableColumnDisplayComponent} from './column-display/table-column-display.component';
import {StorageService} from '../../service/storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Directive, OnInit} from '@angular/core';
import {DataSourceInterface} from '../datasource/datasource.interface';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import * as moment from 'moment';
import {TableDataSource} from '../datasource/table-datasource';

@Directive()
export class TableColumnSettingsDirective implements OnInit {
  userSettings: string;

  columns: Column[];
  defaultColumns: Column[];

  selection = new SelectionModel<any>(true, []);

  dataSource: TableDataSource<any> | DataSourceInterface;

  constructor(protected dialog: MatDialog, protected storageService: StorageService) {
  }

  get displayedColumns(): Array<string> {
    const defaultKeys = this.defaultColumns ? [...this.defaultColumns].map((column: Column) => {
      return column.key;
    }) : null;
    const filteredResult = this.columns ? this.columns.filter((column: Column) => {
      return column.enabled === true && (!defaultKeys || defaultKeys.indexOf(column.key) >= 0);
    }) : this.defaultColumns;

    return filteredResult.map((column: Column) => column.key);
  }

  get isAllSelected(): boolean {
    if (!this.dataSource) {
      return false;
    }
    if (this.selection.isEmpty()) {
      return false;
    }
    return this.selection.selected.length === this.dataSource.data.length || this.selection.isSelected('*');
  }

  ngOnInit(): void {
    const columns = this.storageService.getItem(this.userSettings);
    if (!!columns) {
      this.columns = JSON.parse(columns);
    } else {
      this.columns = [...this.defaultColumns];
    }
  }

  selectAll(): void {
    this.selection.clear();
    this.masterToggle();
    this.selection.select('*');
  }

  masterToggle(): void {
    if (!this.dataSource) {
      return;
    }

    if (this.selection.selected.length > 0) {
      this.selection.clear();

    } else if (this.dataSource instanceof TableDataSource) {
      const loopValue = (this.dataSource.paginator.pageIndex + 1) * this.dataSource.paginator.pageSize;

      let index = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;

      for (index; index < loopValue; index++) {
        const item = this.dataSource.data[index];
        if (!!item) {
          this.selection.select(item);
        }
      }

    } else {
      this.dataSource.data.forEach((item) => {
        this.selection.select(item);
      });
    }
  }

  openSelectionDialog(): void {
    const config = new MatDialogConfig();
    config.data = {
      defaultColumns: this.defaultColumns,
      columns: this.columns
    };

    this.dialog
      .open(TableColumnDisplayComponent, config)
      .afterClosed().subscribe(result => {
      if (!!result) {
        this.columns = result;
        this.storageService.setItem(this.userSettings, JSON.stringify(result));
      }
    });
  }

  backgroundColor(startedAt: string, finishedAt: string): string {
    const bgColor = '#e8f5e9';
    const format = 'YYYY-MM-DD';
    const from = moment(startedAt).format(format);
    const to = moment(finishedAt).format(format);
    return moment(moment().format(format))
      .isBetween(from, to, undefined, '[]') ? bgColor : '';
  }

  trackById(index, item): number {
    return item.id;
  }
}
