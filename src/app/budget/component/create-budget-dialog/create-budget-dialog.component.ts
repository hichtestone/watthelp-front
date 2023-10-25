import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-budget-dialog.component.html',
  styleUrls: ['./create-budget-dialog.component.scss']
})
export class CreateBudgetDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateBudgetDialogComponent>,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      year: ['',
        Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]
        )]
    });
  }

  confirm(): void {
    this.dialogRef.close(+this.form.controls.year.value);
  }
}
