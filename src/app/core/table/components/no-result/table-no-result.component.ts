import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-no-result',
  templateUrl: './table-no-result.component.html',
  styleUrls: ['./table-no-result.component.scss']
})
export class TableNoResultComponent implements OnInit {
  @Input()
  title = 'common.search-none-result';
  @Input()
  description = 'common.search-description';
  @Input()
  icon = 'search';

  constructor() {
  }

  ngOnInit(): void {
  }
}
