import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {ActionUpload} from '../../../core/model/action-upload.model';
import {BudgetInterface} from '../../model/budget.interface';
import {BudgetService} from '../../service/budget.service';
import {TableComponent} from './table/table.component';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {UploadDialogComponent} from '../../../core/component/upload-perimeter/upload-dialog.component';
import {CreateBudgetDialogComponent} from '../create-budget-dialog/create-budget-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractFormComponent} from "../../../core/component/abstract-form.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends AbstractFormComponent implements OnInit {
  expand = [
    'previous_budget',
    'calculated_info',
    'budget_delivery_point_budgets',
    'delivery_point_budget_delivery_point'
  ].join(',');

  dataSource: ApiDataSource<BudgetInterface> | null;
  actionCreateBudget = new ActionUpload(['management.budget.edit'], 'add', 'Créer un budget');
  actionImport = new ActionUpload(['management.import.budget'], 'cloud_upload', 'Importer un budget');

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    private dialog: MatDialog,
    private budgetService: BudgetService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<BudgetInterface>(
      this.budgetService,
      this.table.paginator,
      this.table.sort,
      'previous_budget,calculated_info'
    );

    this.table.sort.sort({id: 'year', start: 'desc', disableClear: false});
  }

  openImportDialog(): void {
    this.dialog
      .open(UploadDialogComponent, {
        data: {
          title: 'Importer un budget',
          service: this.budgetService,
        }
      })
      .afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.dataSource.filter = this.dataSource.filter;
      }
    });
  }

  onExportBudgetToExcel(ids: number[]): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: 'Confirmation d\'export',
        description: 'Exporter les budgets au format Excel ?'
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.budgetService.exportBudgetToExcel(ids).subscribe(
            () => {
              this.snackbarService.addMessage('Le fichier Excel a été généré avec succès, il sera disponible sous peu dans vos notifications.');
            },
            () => {
              this.snackbarService.addMessage('Une erreur est survenue lors de la génération du fichier Excel.');
            }
          );
        }
      });
  }

  remove(ids: number[]): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: 'Confirmation de suppression',
        description: `Êtes-vous certain de vouloir supprimer ces ${ids.length} budgets ?`
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.budgetService.removeBudget(ids).subscribe(
            () => {
              this.snackbarService.addMessage('La suppression a bien été effectuée.');
              this.dataSource.filter = this.dataSource.filter;
            },
            () => {
              this.snackbarService.addMessage('Une erreur est survenue lors de la suppression.');
            }
          );
        }
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateBudgetDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((year: number) => {
      if (!!year) {
        this.budgetService.post({year}, this.expand).subscribe(
          (budget: BudgetInterface) => {
            this.snackbarService.addMessage('Le budget a bien été créé.');
            this.router.navigate(['/budget/' + budget.id], {relativeTo: this.route});
          },
          error => this.snackbarService.addMessage(this.handleModalError(error))
        );
      }
    });
  }
}
