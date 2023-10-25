import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {AbstractWidgetComponent} from './abstract-widget.component';
import {WidgetOptionsInterface} from '../../model/widget-options.interface';
import {WidgetDataInterface} from '../../model/widget-data.interface';
import {LoadWidgetComponent} from './load-widget.component';
import {AclService} from '../../../core/service/acl.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetFactory extends LoadWidgetComponent {

  /**
   * Force to use | any because of compilation error, _factories does not exit on ComponentFactoryResolver
   */
  constructor(protected componentFactoryResolver: ComponentFactoryResolver, protected aclService: AclService) {
    super(componentFactoryResolver, aclService);

    this.loadWidgets();
  }

  get components(): any {
    return this.factories.filter((component) => component.componentType.prototype instanceof AbstractWidgetComponent);
  }

  getOptions(className: string): WidgetOptionsInterface {
    const factoryClass = this.getFactory(className);

    if (factoryClass.componentType.hasOwnProperty('config')) {
      return (factoryClass.componentType as any).config.options;
    }
    return AbstractWidgetComponent.config.options;
  }

  getFactory(className): any {
    const factoryClass = this.factories.find((x: any) => x.selector === className) as any;
    return this.componentFactoryResolver.resolveComponentFactory(factoryClass.componentType);
  }

  create(viewContainerRef: ViewContainerRef, widgetData: WidgetDataInterface): ComponentRef<any> {
    const factory = this.getFactory(widgetData.component);
    const componentRef = viewContainerRef.createComponent(factory);
    const instance: any = componentRef.instance;

    if (instance instanceof AbstractWidgetComponent) {
      instance.ref = componentRef;

      if (!!widgetData.config) {
        instance.config = widgetData.config;
      }
    }
    widgetData.editable = typeof instance.edit === 'function';
    return componentRef;
  }
}
