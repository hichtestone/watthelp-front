import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../service/snackbar.service';
import {AbstractFormComponent} from '../abstract-form.component';
import {FileService} from '../../service/file.service';
import {FileInterface} from '../../model/file.interface';
import {ApiFileInterface} from '../../model/api-file.interface';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: 'upload-dialog.component.html',
  styleUrls: ['upload-dialog.component.scss'],
})
export class UploadDialogComponent extends AbstractFormComponent implements OnInit {

  @ViewChild('fileInputRef', {static: true}) fileInputRef: ElementRef;

  acceptSheetType = 'application/vnd.ms-excel,application/xls,application/xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  form: FormGroup;
  isLoading = false;
  file: FileInterface;
  fileInput: any;
  fileLabel: string;
  title: string;
  service: ApiFileInterface;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    private fileService: FileService,
    private translocoService: TranslocoService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.title = data.title;
    this.service = data.service;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      file: '',
    });
  }

  onFileChange(fileInput: any): void {
    this.isLoading = true;
    this.fileInput = fileInput;

    if (this.fileInput.target.files && this.fileInput.target.files[0]) {
      this.fileLabel = this.fileInput.target.files[0].name;
    }

    if (this.fileInput) {
      const file = this.fileInput.target.files[0];
      const formData: FormData = new FormData();

      formData.append('file', file, file.name);

      this.fileService.upload(formData).subscribe((fileUpload: FileInterface) => {
          this.file = fileUpload;

          if (!!this.file) {
            this.isLoading = false;
          }
        },
        (error) => {
          this.snackbarService.addMessage(this.handleModalError(error));
        });
    }
  }

  triggerChangeFile(): void {
    this.fileInputRef.nativeElement.click();
  }

  submit(): void {
    this.isLoading = true;

    const dataToSend = {
      file: this.file ? this.file.id : null
    };
    this.service.import(dataToSend).subscribe(
      (data) => {
        if (!!data) {
          this.isLoading = false;
        }
        this.snackbarService.addMessage(this.translocoService.translate('common.success-excel-import'));
        this.dialogRef.close();
      },
      (error) => this.snackbarService.addMessage(this.handleModalError(error))
    );
  }
}
