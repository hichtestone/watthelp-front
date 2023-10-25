import {Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {ResizedEvent} from 'angular-resize-event';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetComponent implements OnDestroy {
  @Input()
  icon: string;

  @Input()
  svgIcon: string;

  @Input()
  title: string;

  @Input()
  isLoading = false;

  @Input()
  noPadding = false;

  @Output()
  resizeWidget = new EventEmitter<ResizedEvent>();

  /**
   * Debouncer is here to limit resize call.
   * When resize widget, onResize is called a lot of time
   */
  debouncer = new Subject<ResizedEvent>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.debouncer
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300))
      .subscribe((value) => this.resizeWidget.emit(value));
  }

  onResize(value: ResizedEvent): void {
    this.debouncer.next(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
