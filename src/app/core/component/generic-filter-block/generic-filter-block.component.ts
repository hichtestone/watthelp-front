import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-generic-filter-block',
  templateUrl: './generic-filter-block.component.html',
  styleUrls: ['./generic-filter-block.component.scss']
})
export class GenericFilterBlockComponent {
  @Output() clear = new EventEmitter<any>();
}
