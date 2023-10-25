import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input()
  disabled = false;

  @Input()
  loading = false;

  @Input()
  label: string;

  @Input()
  labelLoading: string;

  @Input()
  type = 'submit';

  @Input()
  color: 'primary' | 'warn' | 'accent' = 'primary';

  @Output()
  clickButton = new EventEmitter();

  ngOnInit(): void {
  }

  onClick(event): void {
    this.clickButton.emit(event);
  }
}
