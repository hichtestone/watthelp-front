import {GridsterItem} from 'angular-gridster2';
import {EditableInterface} from './editable.interface';
import {AbstractWidgetComponent} from '../component/widget/abstract-widget.component';

export interface WidgetDataInterface extends GridsterItem {
  component: string;
  instance?: AbstractWidgetComponent | EditableInterface;
  editable?: boolean;
  isEditing: boolean;
  isLoading: boolean;
  config?: any;
}
