import {PermissionInterface} from './permission/permission.interface';
import {UserInterface} from '../../user/model/user.interface';

export class RoleInterface {
  id: number;
  name: string;
  description: string;
  users: UserInterface[];
  permissions: PermissionInterface[];
  created_at: string;
}
