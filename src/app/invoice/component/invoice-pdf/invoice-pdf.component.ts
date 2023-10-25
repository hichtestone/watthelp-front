import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileInterface} from '../../../core/model/file.interface';
import {InvoiceInterface} from '../../model/invoice/invoice.interface';

@Component({
  selector: 'app-pdf-file',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss'],
})
export class InvoicePdfComponent {
  @Input() fieldTitle: string;

  @Input() file: FileInterface = null;

  @Input() showControls = true;

  @Output() pdfUploaded = new EventEmitter();

  invoiceData: InvoiceInterface;

  @Input() set property(property: InvoiceInterface) {
    if (!!property) {
      this.invoiceData = property;
    }
  }

  pdfUpload(file: FileInterface): void {
    this.file = file;
    this.pdfUploaded.emit(file);
  }
}
