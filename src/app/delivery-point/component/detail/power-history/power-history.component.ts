import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TableDataSource} from "../../../../core/table/datasource/table-datasource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PowerHistoryInterface} from "../../../model/power-history.interface";

@Component({
  selector: 'app-power-history',
  templateUrl: './power-history.component.html',
  styleUrls: ['./power-history.component.scss']
})
export class PowerHistoryComponent implements OnInit {

  @Input() dataSource: TableDataSource<PowerHistoryInterface> | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  defaultColumns = ['power', 'at'];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
