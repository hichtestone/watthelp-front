import {Component, Inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {
  title: string;
  description;

  constructor(
    private dialogRef: MatDialogRef<DialogInfoComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.description = this.sanitizer.bypassSecurityTrustHtml(data.description);
  }
}
