import {Component, DoCheck, ElementRef, HostBinding, Injector, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {google} from '@agm/core/services/google-maps-types';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-input-gmaps-address',
  templateUrl: './input-gmaps-address.component.html',
  styleUrls: ['./input-gmaps-address.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: InputGMapsAddressComponent
    }
  ]
})
export class InputGMapsAddressComponent implements OnInit, DoCheck, OnDestroy, MatFormFieldControl<InputGMapsAddressComponent> {

  static nextId = 0;

  @Input() label = 'Adresse';

  /* This property should return the ID of an element in the component's template
   * that we want the <mat-form-field> to associate all of its labels and hints with.
   * In this case, we'll use the host element and just generate a unique ID for it.
   */
  @HostBinding() id = `input-${InputGMapsAddressComponent.nextId++}`;

  @HostBinding('attr.aria-describedby') describedBy = '';

  // ############### Google Maps Autocomplete input parameters ###############
  country = ['fr', 'es', 'pt', 'it', 'ch', 'de', 'lu', 'be', 'gb', 'uk'];
  types = ['address'];
  // ###################################################################

  /* let the mat-form-field know when something happens in the form field control
   * that may require the form field to run change detection.
   */
  stateChanges = new Subject<void>();

  /* This property indicates whether or not the form
   * field control should be considered to be in a focused state.
   * When it is in a focused state, the form field is displayed with a solid color underline.
   */
  focused = false;

  /* This property indicates whether the form field control is empty.
   * For our control, we'll consider it empty if all of the parts are empty.
   */
  errorState = false;

  /* This property allows us to specify a unique string for the type of control in form field.
   * The <mat-form-field> will add an additional class based on this type that can be used
   * to easily apply special styles to a <mat-form-field> that contains a specific type of control.
   */
  controlType = 'gmap-input';

  isDisabled = false;
  isRequired = false;

  placeHolder: string;

  /* This property allows someone to set or get the value of our control.
  * Its type should be the same type we used for the type parameter
  * when we implemented MatFormFieldControl.
  */
  valueRes = '';

  // Value typed by user
  textEntered: string;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    protected elRef: ElementRef,
    protected injector: Injector,
    protected fm: FocusMonitor) {
    if (this.ngControl != null) {

      /* Setting the value accessor directly (instead of using
       * the providers) to avoid running into a circular import.
       */
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;

      if (!this.focused) {
        this.onTouch(true);
      }

      this.stateChanges.next();
    });
  }

  get required(): any {
    return this.isRequired;
  }

  @Input()
  set required(req) {
    this.isRequired = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get value(): any {
    return this.valueRes;
  }

  set value(val) {
    if (this.valueRes !== val) {
      this.valueRes = val;
      this.onChange(val);
      this.onTouch(val);
    }
    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this.value && !this.textEntered;
  }

  /* This method is used to indicate whether the label should be in the floating position.
   * We'll use the same logic as matInput and float the placeholder
   * when the input is focused or non-empty. Since the placeholder will be overlapping our control
   * when when it's not floating, we should hide the – characters when it's not floating.
   */
  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
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

  @Input()
  get placeholder(): string {
    return this.placeHolder;
  }

  set placeholder(plh) {
    this.placeHolder = plh;
    this.stateChanges.next();
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onAutocompleteSelected(result: PlaceResult): void {
    this.value = result.formatted_address;
  }

  onAddressChange(val): void {
    this.textEntered = val;

    // Remove the google maps value in the field whether the text the user should enter is empty
    if (val === '') {
      this.value = val;
    }
  }

  /* This method is used by the <mat-form-field> to specify the IDs
   * that should be used for the aria-describedby attribute of your component.
   * The method has one parameter, the list of IDs,
   * we just need to apply the given IDs to our host element.
   */
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  /* This method will be called when the form field is clicked on.
   * It allows your component to hook in and handle that click however it wants.
   * The method has one parameter, the MouseEvent for the click.
   * In our case we'll just focus the first <input> if the user isn't about to click an <input> anyways.
   */
  onContainerClick(event: MouseEvent): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange: (value: any) => void = () => {
  }

  onTouch: (value: any) => void = () => {
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
