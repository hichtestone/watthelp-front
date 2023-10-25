import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {HttpServiceInterface} from '../../service/http-service.interface';
import {Subject} from 'rxjs';

@Directive()
export abstract class AbstractSelectChipDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild('itemInput', {static: false}) itemInput: ElementRef;

  @Input() placeholder = 'Rechercher';
  @Input() expandData: string;
  @Input() resetEvent: EventEmitter<boolean>;
  @Input() filters: any = {};
  searchBy = 'name';
  sortBy: string;
  ctrl = new FormControl();
  filtered: any[] = [];
  selected: any[] = [];
  separatorKeysCodes = [13, 188];
  valueRes: any;
  private destroy$ = new Subject<boolean>();

  protected constructor(protected service: HttpServiceInterface<any>) {
  }

  get value(): any {
    return this.valueRes;
  }

  set value(value) {
    if (!!value) {
      if (Array.isArray(value)) {
        value = value.map(item => {
          if (typeof item === 'object' && this.selected.indexOf(item) < 0) {
            this.selected.push(item);
            return item.id;
          }
          return item;
        });
      }
    } else {
      this.selected = [];
    }
    if (this.valueRes !== value) {
      this.valueRes = value;
      this.propagateChange(value);
      this.propagateTouch(value);
    }
  }

  propagateTouch: any = () => {
  };
  propagateChange = (_: any) => {
  };

  ngOnInit(): void {
    if (this.resetEvent) {
      this.resetEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.selected = [];
      });
    }
    this.ctrl.valueChanges.pipe(debounceTime(10))
      .subscribe(() => {
        this.search();
      });
  }

  search(): void {
    let filterValue = '';
    if (this.ctrl.value && typeof this.ctrl.value !== 'object') {
      filterValue = this.ctrl.value.toLowerCase();
    }
    const data = {
      sort: this.sortBy || this.searchBy,
      per_page: 25,
      filters: {
        ...this.filters,
        exclude_ids: this.selected.map(item => item.id)
      }
    };
    data.filters[this.searchBy] = filterValue;
    this.service.list(data, this.expandData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((paginator) => {
        const matching = paginator.data.filter(item => this.itemMatch(item, filterValue));
        this.filtered = matching.filter(item => this.selected.indexOf(item) < 0);
      });
  }

  itemMatch(item, filterValue): boolean {
    return item[this.searchBy].toLowerCase().indexOf(filterValue) >= 0;
  }

  select(event): void {
    const selected = event.option.value;
    if (this.selected.indexOf(selected) < 0) {
      this.selected.push(selected);
      this.changeFilter();
      this.itemInput.nativeElement.value = '';
      this.ctrl.setValue(null);
    }
  }

  remove(id: number): void {
    this.selected = this.selected.filter((item: any) => item.id !== id);
    this.changeFilter();
  }

  changeFilter(): void {
    this.value = this.selected.map(item => item.id);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  displayName(item: any): void {
    return item[this.searchBy];
  }

  displayOption(item: any): void {
    return this.displayName(item);
  }

  displayTooltip(item: any): any {
    return;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
