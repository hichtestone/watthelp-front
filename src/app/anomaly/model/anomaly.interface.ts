import {NoteInterface} from './note.interface';
import {InvoiceInterface} from '../../invoice/model/invoice/invoice.interface';
import {ItemAnalysesInterface} from '../../invoice/model/delivery-point-invoice/item-analyses.interface';
import {ImportReportInterface} from '../../import-report/model/import-report.interface';

export interface AnomalyInterface {
  id: number;
  invoice: InvoiceInterface;
  item_analysis: ItemAnalysesInterface;
  notes: NoteInterface[];
  import_report: ImportReportInterface;
  type: string;
  status: string;
  profit: string;
  content: string;
  current_value: string;
  expected_value: string;
  applied_rules: string;
  total: number;
  total_percentage: number;
  created_at: string;
}
