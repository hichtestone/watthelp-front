import {Directive, DoCheck, ElementRef, HostBinding, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MatFormFieldControl} from '@angular/material/form-field';

@Directive()
export abstract class AbstractAutocompleteDirective<T> implements OnInit, OnDestroy, DoCheck, MatFormFieldControl<any>,
  ControlValueAccessor {

  static nextId = 0;

  ngControl: NgControl;

  stateChanges = new Subject<void>();

  controlType: string;

  /**
   * entity column to search
   */
  searchedColumn = 'name';

  errorState = false;

  focused = false;

  @Input()
  emptyValue = false;
  /**
   * Value display on the mat-autocomplete
   */
  data: T[] = [];
  /**
   * Event when value change on input
   */
  valueChanged = new Subject<string>();
  @HostBinding() id = `input-${AbstractAutocompleteDirective.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  filtersObj = {};
  valueRes: any;
  public placeholderValue: string;
  public isRequired = false;
  protected isDisabled = false;
  /**
   * Event to kill all subscriber
   */
  private destroy$ = new Subject<boolean>();

  protected constructor(protected elRef: ElementRef, protected injector: Injector, protected fm: FocusMonitor) {

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();

      // Search when focused
      if (!!origin && origin === 'keyboard' && this.data.length === 0) {
        if (typeof this.valueRes !== 'object') {
          this.search(this.valueRes);
        } else {
          this.search(this.valueRes[this.searchedColumn]);
        }
      }
    });

    // Search is for when user is typing to search a specific result;
    this.valueChanged
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        // Only when the value is string.
        if (typeof value !== 'object') {
          this.search(value);
        }
      });
  }

  get filters(): any {
    return this.filtersObj;
  }

  @Input()
  set filters(filters) {
    this.filtersObj = filters;
    this.data = [];
  }

  @Input()
  set default(defaultValue) {
    if (!!defaultValue) {
      this.data = [defaultValue];
      this.value = defaultValue;
    }
  }

  get value(): any {
    return this.valueRes;
  }

  /**
   * This method will send to parent form a value:
   * - id in case of it's a selected object (click on autocomplete result)
   * - empty if it's a string.
   *
   * We keep in _value the value of the current input.
   */
  set value(value) {
    if (this.valueRes !== value) {
      this.valueRes = value;
      this.onTouched();

      // We search if typed value match with an existing object
      const find = this.data.find(dispatcher => dispatcher[this.searchedColumn] === value);
      if (!!find) {
        value = find;
      }

      // If it's an object, it's because user click on a choice
      if (typeof value === 'object') {
        this.onChange(value); // Send id only
      } else {
        // User select empty value or it's a string.
        this.onChange(null);
      }
    }

    this.stateChanges.next();
  }

  get placeholder(): string {
    return this.placeholderValue;
  }

  @Input()
  set placeholder(plh) {
    this.placeholderValue = plh;
    this.stateChanges.next();
  }

  get required(): boolean {
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
    this.destroy$.next(true);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent): void {
    if (this.data.length === 0) {
      this.search();
    }
  }

  /** `View -> model callback called when value changes` */
  onChange: (value: any) => void = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** `View -> model callback called when select has been touched` */
  onTouched = () => {
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (!!obj && typeof obj === 'object') {
      this.value = obj;
    } else {
      this.value = '';
    }
  }

  /**
   * Track for ngFor areas
   */
  trackById(index, item): number {
    return item.id;
  }

  /**
   * Return the displayed value of the selected choice.
   */
  abstract displayName(value): string;

  displayOption(item: any): any {
    return this.displayName(item);
  }

  /**
   * Search data for autocomplete select and put result in data variable
   */
  abstract search(name?: string): void;
}
