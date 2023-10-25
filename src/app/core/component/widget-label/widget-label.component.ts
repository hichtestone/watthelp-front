import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-widget-label',
  templateUrl: './widget-label.component.html',
  styleUrls: ['./widget-label.component.scss']
})
export class WidgetLabelComponent {
  form: FormGroup;

  @Output() valueChange = new EventEmitter<any>();
  @Output() filter = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      label: '',
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
