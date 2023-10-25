import {WidgetDataInterface} from './widget-data.interface';
import {WidgetOptionsInterface} from './widget-options.interface';

export class DashboardModel {
  widgets: WidgetDataInterface[] = [];
  updated = false;

  constructor(obj = null) {
    Object.assign(this, obj);
    this.widgets.map(widget => {
      widget.isEditing = false;
      widget.isLoading = false;
    });
  }

  addWidget(componentName: string, options: WidgetOptionsInterface): void {
    this.widgets.push({
      x: 0,
      y: 0,
      cols: options.cols,
      rows: options.rows,
      minItemCols: options.minItemCols || 1,
      minItemRows: options.minItemRows || 1,
      component: componentName,
      isEditing: false,
      isLoading: false
    });
    this.updated = true;
  }

  removeWidget(widget): void {
    this.widgets.splice(this.widgets.indexOf(widget), 1);
    this.updated = true;
  }
}
