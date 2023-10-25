import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output()
  valueChange = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      label: '',
      color_found: '',
      color_not_found: ''
    });

    this.form.valueChanges
      .pipe(
        debounceTime(300),
        untilDestroyed(this, 'destroy'))
      .subscribe(() => this.valueChange.emit(this.form.value));
  }

  @Input()
  set config(config: any) {
    this.form.patchValue(config);
  }

  destroy(): void {
  }
}
