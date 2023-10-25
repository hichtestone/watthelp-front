import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SnackbarService} from '../../service/snackbar.service';
import {FileService} from '../../service/file.service';
import {FileInterface} from '../../model/file.interface';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {

  fileUploading = false;
  fileName: string;

  @Input() fileInput: any;
  @Input() fieldTitle: string;
  @Input() loadingLabel: string;
  @Input() successMessageContent: string;
  @Output() pdfUploaded = new EventEmitter();
  @Input() showControls = true;

  @ViewChild('fileInputRef', {static: false}) fileInputRef: ElementRef;

  constructor(private snackBarService: SnackbarService, private fileService: FileService) {
  }

  public triggerChangeFile(): void {
    this.fileInputRef.nativeElement.click();
  }

  public fileChangeEvent(fileInput: any): void {
    this.fileUploading = true;

    this.fileInput = fileInput;
    if (this.fileInput.target.files && this.fileInput.target.files[0]) {
      this.fileName = this.fileInput.target.files[0].name;
    }

    if (this.fileInput) {
      const formData: FormData = new FormData();
      const pdfFile = this.fileInput.target.files[0];

      formData.append('file', pdfFile, pdfFile.name);

      this.fileService.upload(formData).subscribe(
        (pdf: FileInterface) => {

          if (!!pdf) {
            this.fileUploading = false;
            this.pdfUploaded.emit(pdf);
          }
        },
        (error) => {
          this.fileInput = null;
          this.fileUploading = false;
        });
    }
  }
}
