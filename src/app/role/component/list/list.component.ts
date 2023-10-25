import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {RoleInterface} from '../../model/role.interface';
import {RoleService} from '../../service/role.service';
import {TableComponent} from './table/table.component';
import {ActionLink} from '../../../core/model/action-link.model';
import {DialogConfirmComponent} from "../../../core/component/dialog-confirm/dialog-confirm.component";
import {Permission} from "../../model/permission/permission-constant";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  dataSource: ApiDataSource<RoleInterface> | null;
  actionLink = new ActionLink('/role/new', [Permission.ROLE_EDIT], 'add', 'role.breadcrumb.create');


  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: '',
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<RoleInterface>(
      this.roleService,
      this.table.paginator,
      this.table.sort,
      'role_users'
    );

    this.table.sort.sort({id: 'name', start: 'asc', disableClear: false});

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

  reset(): void {
    this.form.reset();
    this.filter(this.form.value);
  }

  destroy(): void {
  }

  onDeleteRole(id: number): void {
    if (!!id) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: 'Suppression d\'un rôle',
          description: 'Êtes-vous sûr de vouloir supprimer ce rôle ?',
          submitButton: 'Oui',
          cancelButton: 'Non'
        }
      });

      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            this.roleService.delete(id).subscribe(
              () => {
                this.snackbarService.addMessage('Le rôle a bien été supprimé !');
                this.dataSource.filter = this.dataSource.filter;
              },
              () => this.snackbarService.addMessage('Désolé, une erreur est survenue lors de la suppression. Merci de contacter votre administrateur.'));
          }
        }
      );
    }
  }

  onDuplicateRole(id: number): void {
    this.router.navigate([`/role/duplicate/${id}`]);
  }
}
