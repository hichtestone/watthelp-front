import {WidgetOptionsInterface} from './widget-options.interface';

export interface WidgetConfigInterface {
  title: string;
  group: string;
  preview: string;
  description?: string;
  options: WidgetOptionsInterface;
}
