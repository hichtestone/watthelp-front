import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DeltaDate} from "../../validator/date.validator";

@Component({
  selector: 'app-widget-period',
  templateUrl: './widget-period.component.html',
  styleUrls: ['./widget-period.component.scss']
})
export class WidgetPeriodComponent {
  form: FormGroup;
  @Output() valueChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        label: '',
        start: '',
        end: ''
      },
      {
        validators: DeltaDate('start', 'end')
      });

    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this, 'destroy'))
      .subscribe(() => this.valueChange.emit(this.form.value));
  }

  @Input()
  set config(config: any) {
    this.form.patchValue(config);
  }

  destroy(): void {
  }
}
