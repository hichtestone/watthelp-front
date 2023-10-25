import {UserDashboardInterface} from '../../dashboard/model/user-dashboard.interface';
import {FileInterface} from '../../core/model/file.interface';
import {RoleInterface} from '../../role/model/role.interface';

export interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile: string;
  phone: string;
  avatar: FileInterface;
  language: string;
  roles: RoleInterface[];
  permissions: any[];
  super_admin: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  connected_at: string;
  dashboard: UserDashboardInterface;
}
