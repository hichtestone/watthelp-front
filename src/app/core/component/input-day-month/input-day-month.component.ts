import {
    Component,
    DoCheck,
    ElementRef,
    forwardRef,
    HostBinding,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self
} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {CalendarHeaderComponent} from './input-header/calendar-header.component';
import {CustomDateAdapterService} from '../../service/custom-date-adapter.service';
import {NgControl} from '@angular/forms';
import {MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    selector: 'app-input-day-month',
    templateUrl: './input-day-month.component.html',
    styleUrls: ['./input-day-month.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapterService},
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => InputDayMonthComponent),
        }
    ]
})
export class InputDayMonthComponent implements OnInit, DoCheck, OnDestroy, MatFormFieldControl<InputDayMonthComponent> {
    static nextId = 0;
    calendarHeader = CalendarHeaderComponent;

    @Input() inputLabel: string;

    @HostBinding() id = `input-${InputDayMonthComponent.nextId++}`;

    @HostBinding('attr.aria-describedby') describedBy = '';

    stateChanges = new Subject<void>();

    focused = false;

    errorState = false;

    controlType = 'date-input';

    isDisabled = false;

    isRequired = false;

    placeHolder: string;

    valueRes = '';

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
        if (!!val && this.valueRes !== val) {
            this.valueRes = val;
            this.onChange(val);
            this.onTouch(val);
        }
        this.stateChanges.next();
    }

    get empty(): boolean {
        return !this.value && !this.textEntered;
    }


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

    setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent): void {
    }

    writeValue(value: any): void {
        this.value = value;
        this.textEntered = value;
        this.onChange(value);
        this.onTouch(value);
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
