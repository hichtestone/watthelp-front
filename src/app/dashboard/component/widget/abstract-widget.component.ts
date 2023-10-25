import {AfterViewChecked, ComponentRef, EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {WidgetConfigInterface} from '../../model/widget.config.interface';

@Injectable()
export class AbstractWidgetComponent implements AfterViewChecked, OnDestroy {
  static config: WidgetConfigInterface;

  @Output() configChange = new EventEmitter<any>();
  @Output() loadingChange = new EventEmitter<boolean>();

  /**
   * Highcharts need unique id to display his chart but when you put the same widget multiple times...
   */
  id = Math.random().toString(36).substr(2, 9);
  public destroy$ = new Subject<boolean>();
  protected checkView = new EventEmitter<boolean>();
  protected componentRef: ComponentRef<any>;
  protected settings: any = null;
  protected loadingStatus = true;

  // Widget component change detection is inactive on view init

  // Listen emitted updates after view init, and display changes
  set ref(componentRef: ComponentRef<any>) {
    this.componentRef = componentRef;
    this.checkView
      .pipe(debounceTime(10), takeUntil(this.destroy$))
      .subscribe(() => {
        this.componentRef.changeDetectorRef.detectChanges();
      });
  }

  get config(): any {
    return this.settings;
  }

  set config(settings) {
    this.settings = settings;
    this.configChange.emit(settings);
  }

  get isLoading(): boolean {
    return this.loadingStatus;
  }

  set isLoading(load: boolean) {
    this.loadingStatus = load;
    this.loadingChange.emit(load);
  }

  ngAfterViewChecked(): void {
    // Emit event if widget is updated after view init
    this.checkView.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if (this.componentRef?.changeDetectorRef) {
      this.componentRef.changeDetectorRef.detach();
    }
  }

  handleWidgetFormError(error): any {
    for (const field in error) {
      if (error.hasOwnProperty(field)) {
        return error[field];
      }
    }
  }

  handleWidgetError(error: any): string {
    let result: string;

    for (const field in error) {
      if (error.hasOwnProperty(field)) {
        result = typeof error === 'object' ? error[field] : error;
      }
    }
    return result;
  }
}
