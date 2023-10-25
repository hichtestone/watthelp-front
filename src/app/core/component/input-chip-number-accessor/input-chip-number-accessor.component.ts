import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-input-chip-number-accessor',
  templateUrl: './input-chip-number-accessor.component.html',
  styleUrls: ['./input-chip-number-accessor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputChipNumberAccessorComponent),
      multi: true
    }
  ]
})
export class InputChipNumberAccessorComponent implements ControlValueAccessor {
  @Input() label: string;
  selected: string[] = [];

  @Input() maxLength = 4;
  @Input() selectable = true;
  @Input() removable = true;
  @Input() addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  set value(value) {
    if (!!value && this.selected !== value) {
      this.selected = value;
      this.propagateChange(value);
      this.propagateTouch(value);
    }
  }

  remove(item: string): void {
    const index = this.selected.indexOf(item);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
    this.propagateChange(this.selected);
    this.propagateTouch(this.selected);
  }

  add(event: MatChipInputEvent): void {
    if ((event.value || '').trim()) {
      this.selected = this.selected || [];
      const index = this.selected.indexOf(event.value.trim());

      // Add item whether it doesn't exist in the array
      if (index === -1) {
        this.selected.push(event.value.trim());
        this.propagateChange(this.selected);
        this.propagateTouch(this.selected);
      }
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  writeValue(obj: any[]): void {
    this.selected = obj;
    this.propagateChange(obj);
  }

  propagateTouch: any = () => {
  };

  propagateChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
}
