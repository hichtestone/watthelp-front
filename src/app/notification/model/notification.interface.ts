import {UserInterface} from '../../user/model/user.interface';
import {NotificationDataInterface} from './notification-data.interface';

export interface NotificationInterface {
  id: number;
  user: UserInterface;
  message: string;
  url: string;
  is_read: boolean;
  progress?: number;
  created_at: string;
  updated_at: string;
  data: NotificationDataInterface;
}
