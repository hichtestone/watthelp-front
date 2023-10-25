import {FileInterface} from '../../core/model/file.interface';

export interface ClientInterface {
  id: number;
  name: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  department: string;
  insee: string;
  logo: FileInterface;
}
