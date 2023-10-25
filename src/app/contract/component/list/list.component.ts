import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionLink} from '../../../core/model/action-link.model';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {TableComponent} from './table/table.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ContractService} from '../../service/contract.service';
import {ContractInterface} from '../../model/contract.interface';
import {ProviderEnum} from '../../model/provider.enum';
import {enumToArray} from '../../../core/enum/enum-converter';
import {InvoicePeriodEnum} from '../../model/invoice-period.enum';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource: ApiDataSource<ContractInterface>;
  actionLink = new ActionLink('/contract/new', ['management.contract.edit'], 'add', 'contract.add-new-item');
  form: FormGroup;

  providers = enumToArray(ProviderEnum);
  invoicePeriods = enumToArray(InvoicePeriodEnum);

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private contractService: ContractService,
    private snackbarService: SnackbarService,
    private translocoService: TranslocoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
    this.form = this.fb.group({
      reference: '',
      type: '',
      invoice_period: '',
      provider: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<ContractInterface>(
      this.contractService,
      this.table.paginator,
      this.table.sort,
      'contract_pricings'
    );

    this.table.sort.sort({id: 'id', start: 'asc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));
  }

  onDelete(id): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('contract.dialog.deletion.title'),
          description: this.translocoService.translate('contract.dialog.deletion.description'),
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.contractService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('contract.dialog.deletion.contract-success-deletion'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }

  applyContract(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('contract.dialog.apply-contract.title'),
        description: this.translocoService.translate('contract.dialog.apply-contract.description'),
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.contractService.refer(id).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('contract.dialog.apply-contract.contract-success-update'));
              this.dataSource.filter = this.dataSource.filter;
            },
            () => this.snackbarService.addMessage(this.translocoService.translate('error.server')));
        }
      }
    );
  }


  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = form;
      this.table.paginator.firstPage();
    }
  }

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  destroy(): void {
  }
}
