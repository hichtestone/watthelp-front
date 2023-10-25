import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {debounceTime} from 'rxjs/operators';
import {InvoiceService} from '../../service/invoice.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {ProviderInfoInterface} from '../../model/invoice/provider-info.interface';
import {FileService} from '../../../core/service/file.service';
import {FileInterface} from '../../../core/model/file.interface';


@Component({
  selector: 'app-invoice-upload',
  templateUrl: 'upload-invoice.component.html',
  styleUrls: ['upload-invoice.component.scss'],
})
export class UploadInvoiceComponent extends AbstractFormComponent implements OnInit {

  @ViewChild('fileInputRef', {static: true}) fileInputRef: ElementRef;

  form: FormGroup;
  isLoading = false;
  file: FileInterface;
  error: string;

  acceptZipType = '.zip,application/x-compressed,application/x-zip-compressed,application/zip,multipart/x-zip';
  acceptSheetType = 'application/vnd.ms-excel,application/vnd.ms-office,application/xls,application/xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  providers: ProviderInfoInterface[] = [
    {
      provider: 'EDF',
      information: 'invoice.dialog.upload.edf-info',
      import_label: 'invoice.dialog.upload.label-zip',
      accept_type: this.acceptZipType
    },
    {
      provider: 'DIRECT_ENERGIE', information: '',
      import_label: 'invoice.dialog.upload.label-excel',
      accept_type: this.acceptSheetType
    },
    {
      provider: 'ENGIE',
      information: 'invoice.dialog.upload.engie-info',
      import_label: 'invoice.dialog.upload.label-zip',
      accept_type: this.acceptZipType
    }
  ];

  fileInput: any;
  fileLabel: string;
  selectedSupplier: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UploadInvoiceComponent>,
    private invoiceService: InvoiceService,
    private fileService: FileService,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      provider: ['', Validators.required],
      file: '',
    });

    this.form.controls.provider.valueChanges.subscribe((value) => {
      this.form.controls.file.reset();
      this.fileInput = null;
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
      this.providers.forEach(p => {
        if (p.provider === values.provider) {
          this.selectedSupplier = p;
        }
      });
    });
  }

  onChange(fileInput: any): void {
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
          this.handleFormError(error);
        });
    }
  }

  triggerChangeFile(): void {
    this.fileInputRef.nativeElement.click();
  }

  submit(): void {
    this.isLoading = true;
    const values = this.form.value;

    const dataToSend = {
      provider: values.provider,
      file: this.file ? this.file.id : null
    };

    this.invoiceService.import(dataToSend).subscribe(
      (data) => {
        if (!!data) {
          this.isLoading = false;
        }
        this.snackbarService.addMessage(
          'Nous avons correctement enregistré votre fichier. Vous recevrez une notification lorsque celui-ci sera importé.'
        );
        this.dialogRef.close();
      },
      (error) => this.error = error
    );
  }
}
