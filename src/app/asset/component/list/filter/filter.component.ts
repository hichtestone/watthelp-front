import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-asset-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() filter = new EventEmitter();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe((values) => {
        this.filter.emit(values);
      });
  }

  destroy(): void {
  }
}
