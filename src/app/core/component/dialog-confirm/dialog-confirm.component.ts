import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  title: string;
  description;
  submitButton: string;
  cancelButton: string;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    private sanitizer: DomSanitizer,
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.submitButton = data.submitButton || this.translocoService.translate('button.ok');
    this.cancelButton = data.cancelButton || this.translocoService.translate('button.cancel');
    this.description = this.sanitizer.bypassSecurityTrustHtml(data.description);
  }
}
