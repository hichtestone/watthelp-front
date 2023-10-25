import {UserInterface} from '../../user/model/user.interface';

export interface NoteInterface {
  id: number;
  user: UserInterface;
  content: string;
  created_at: string;
  updated_at: string;
}
