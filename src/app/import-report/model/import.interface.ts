import {UserInterface} from '../../user/model/user.interface';
import {FileInterface} from "../../core/model/file.interface";

export interface ImportInterface {
  id: number;
  type: string;
  user: UserInterface;
  provider: string;
  file: FileInterface;
  created_at: string;
}
