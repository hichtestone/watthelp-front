import {Directive, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {WidgetDataInterface} from '../model/widget-data.interface';
import {takeUntil} from 'rxjs/operators';
import {WidgetFactory} from '../component/widget/widget.factory';
import {AbstractWidgetComponent} from '../component/widget/abstract-widget.component';

@Directive({
  selector: '[appWidget]',
})
export class WidgetDirective implements OnInit {

  @Output() loadingChange = new EventEmitter<boolean>();
  @Input() widgetData: WidgetDataInterface;
  @Input() widgetConfig;

  constructor(
    private factory: WidgetFactory,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    if (!!this.widgetData && !!this.widgetData.component) {
      const instance = this.factory.create(this.viewContainerRef, this.widgetData).instance;
      if (instance instanceof AbstractWidgetComponent) {
        instance.configChange
          .pipe(takeUntil(instance.destroy$))
          .subscribe(config => this.widgetData.config = config);
        instance.loadingChange
          .pipe(takeUntil(instance.destroy$))
          .subscribe(isLoading => this.loadingChange.emit(isLoading));
        this.widgetData.instance = instance;
      }
      this.widgetData.editable = typeof instance.edit === 'function';
    }
  }
}
