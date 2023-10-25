import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionLink} from '../../../core/model/action-link.model';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {TableComponent} from './table/table.component';
import {UserService} from '../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {UserInterface} from '../../model/user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource: ApiDataSource<UserInterface>;
  actionLink = new ActionLink('/user/new', ['system.user.edit'], 'add', 'user.add-new');
  form: FormGroup;
  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translocoService: TranslocoService
  ) {
    this.form = this.fb.group({
      first_name: '',
      last_name: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<UserInterface>(
      this.userService,
      this.table.paginator,
      this.table.sort,
      'user_avatar,user_roles');

    this.table.sort.sort({id: 'last_name', start: 'asc', disableClear: false});

    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe(() => this.filter(this.form.value));
  }

  filter(form): void {
    if (!!this.dataSource) {
      this.dataSource.filter = form;
      this.table.paginator.firstPage();
    }
  }

  onDelete(id): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('user.dialog.deletion.title'),
          description: this.translocoService.translate('user.dialog.deletion.description')
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.userService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage(this.translocoService.translate('user.dialog.deletion.success'));
                this.dataSource.filter = this.dataSource.filter;
              });
          }
        }
      );
    }
  }

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  destroy(): void {
  }
}
