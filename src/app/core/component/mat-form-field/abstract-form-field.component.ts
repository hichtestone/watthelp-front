import {DoCheck, ElementRef, HostBinding, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MatFormFieldControl} from '@angular/material/form-field';

export class AbstractMatFormFieldComponent implements MatFormFieldControl<any>, ControlValueAccessor, OnInit, OnDestroy, DoCheck {

  static nextId = 0;

  @Input() emptyLabel: string;

  ngControl: NgControl;
  stateChanges = new Subject<void>();
  destroy$ = new Subject<boolean>();
  focused = false;
  errorState = false;

  valueChanged = new Subject<string>();
  @HostBinding() id = `input-${AbstractMatFormFieldComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  isRequired = false;
  isDisabled = false;
  valueRes: any;

  constructor(protected elRef: ElementRef, protected injector: Injector, protected fm: FocusMonitor) {
  }

  _placeholder: string;

  get placeholder(): any {
    return this._placeholder;
  }

  @Input()
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get required(): any {
    return this.isRequired;
  }

  @Input()
  set required(req) {
    this.isRequired = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  get value(): any {
    return this.valueRes;
  }

  set value(value) {
    if (this.valueRes !== value) {
      this.valueRes = value;
      this.onTouched();
      this.onChange(value); // Send id only
    }

    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this.value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  /**
   * Emit event when user change input value by typing.
   */
  changed(value): void {
    this.valueChanged.next(value);
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent): void {
  }

  /** `View -> model callback called when value changes` */
  onChange: (value: any) => void = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** `View -> model callback called when select has been touched` */
  onTouched = () => {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
