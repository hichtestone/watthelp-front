import {AnalysisInterface} from './analysis.interface';
import {DeliveryPointInvoiceInterface} from '../delivery-point-invoice/delivery-point-invoice-interface';
import {FileInterface} from '../../../core/model/file.interface';
import {ReportAnalysisInterface} from "../../../analysis-report/model/report-analysis.interface";
import {ImportReportInterface} from "../../../import-report/model/import-report.interface";

export interface InvoiceInterface {
  id: number;
  reference: string;
  amount_ht: string;
  amount_tva: string;
  amount_ttc: string;
  emitted_at: string;
  pdf: FileInterface;
  import_report: ImportReportInterface
  analysis: AnalysisInterface;
  report_analysis: ReportAnalysisInterface;
  delivery_point_invoices: DeliveryPointInvoiceInterface[];
}
