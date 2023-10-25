import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ContractInterface} from '../../../contract/model/contract.interface';
import {ContractService} from '../../../contract/service/contract.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-contract-assignement',
  templateUrl: './dialog-contract-assignement.component.html',
  styleUrls: ['./dialog-contract-assignement.component.scss']
})
export class DialogContractAssignementComponent implements OnInit {
  form: FormGroup;
  contracts: Array<ContractInterface>;
  title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogContractAssignementComponent>,
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      contractId: ['', Validators.required]
    });

    this.contractService.list({sort: 'id'})
      .pipe(take(1))
      .subscribe((values: any) => {
        this.contracts = values.data;
      });
  }

  submit(): void {
    const value = this.form.value;
    this.dialogRef.close(value.contractId);
  }
}
