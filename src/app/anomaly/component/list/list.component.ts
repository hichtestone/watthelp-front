import {Component, OnInit, ViewChild} from '@angular/core';
import {AnomalyService} from '../../service/anomaly-service';
import {DatePipe} from '@angular/common';
import {TableComponent} from './table/table.component';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {AnomalyInterface} from '../../model/anomaly.interface';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {SaveFormComponent} from '../../../core/component/dialog-save-search/save-form/save-form.component';
import {MatDialog} from '@angular/material/dialog';
import {SavedSearch} from '../../../core/model/saved-search.model';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {AclService} from '../../../core/service/acl.service';
import {Permission} from '../../../role/model/permission/permission-constant';
import {SelectionModel} from '@angular/cdk/collections';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe]
})

export class ListComponent extends AbstractFormComponent implements OnInit {
  static SAVED_SEARCHES_KEY = 'anomaly.searches';
  pattern = '[0-9]+([.][0-9]{1,5})?';

  form: FormGroup;
  dataSource: ApiDataSource<AnomalyInterface> | null;
  savedSearches: SavedSearch[];
  currentSavedSearch: SavedSearch;
  canDownloadInvoice: boolean;

  expand = [
    'anomaly_item_analysis',
    'item_analysis_analysis',
    'analysis_invoice',
    'invoice_pdf',
    'item_analysis_delivery_point_invoice_analysis',
    'delivery_point_invoice_analysis_delivery_point_invoice',
    'delivery_point_invoice_delivery_point'
  ].join(',');

  @ViewChild('table', {static: true}) table: TableComponent;

  constructor(
    protected anomalyService: AnomalyService,
    protected snackbarService: SnackbarService,
    protected aclService: AclService,
    protected dialog: MatDialog,
    protected fb: FormBuilder,
    protected translocoService: TranslocoService
  ) {
    super();
    this.form = this.fb.group({
      total: ['', Validators.pattern(this.pattern)],
      created_from: '',
      created_to: '',
      profit: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new ApiDataSource<AnomalyInterface>(
      this.anomalyService,
      this.table.paginator,
      this.table.sort,
      this.expand
    );

    this.table.sort.sort({id: 'created_at', start: 'asc', disableClear: false});

    const searches = localStorage.getItem(ListComponent.SAVED_SEARCHES_KEY);
    this.savedSearches = searches ? JSON.parse(searches) : [];
    this.canDownloadInvoice = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);
  }

  filter(filters): void {
    if (!!this.dataSource) {
      this.dataSource.filter = filters;
      this.table.paginator.firstPage();
    }
  }

  remove(selection: SelectionModel<AnomalyInterface>): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: {
        title: this.translocoService.translate('anomaly.dialog.deletion.title'),
        description: this.translocoService.translate('anomaly.dialog.deletion.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.anomalyService.remove(selection, this.dataSource.filter).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('anomaly.dialog.deletion.success'));
              this.dataSource.filter = this.dataSource.filter;
              selection.clear();
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('anomaly.dialog.deletion.error'));
            }
          );
        }
      }
    );

  }

  saveFilters(values): void {
    const dialogRef = this.dialog.open(SaveFormComponent, {
      width: '400px',
      data: {
        name: this.currentSavedSearch ? this.currentSavedSearch.name : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (!!this.currentSavedSearch) {
          const index = this.savedSearches.indexOf(this.currentSavedSearch);
          const object = this.savedSearches[index];
          object.name = result.name;
          object.values = values;

          // Replace the saved search to a new one.
          this.currentSavedSearch = object;
        } else {
          const object = new SavedSearch();
          object.name = result.name;
          object.values = values;
          this.savedSearches.push(object);
        }
        localStorage.setItem(ListComponent.SAVED_SEARCHES_KEY, JSON.stringify(this.savedSearches));

        this.snackbarService.addMessage(this.translocoService.translate('anomaly.dialog.search.success'));
      }
    });
  }

  deleteUsedSavedSearch(): void {
    if (!!this.currentSavedSearch) {
      // Remove saved search and update localstorage
      const index = this.savedSearches.indexOf(this.currentSavedSearch);
      this.savedSearches.splice(index, 1);
      localStorage.setItem(ListComponent.SAVED_SEARCHES_KEY, JSON.stringify(this.savedSearches));

      this.currentSavedSearch = null;
    }
  }

  onExportAnomaliesToExcel(selection: SelectionModel<AnomalyInterface>): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '380px',
      data: {
        title: this.translocoService.translate('anomaly.dialog.export-excel.title'),
        description: this.translocoService.translate('anomaly.dialog.export-excel.description')
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (!!confirm) {
          this.anomalyService.exportAnomaliesToExcel(selection, this.dataSource.filter).subscribe(
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('anomaly.dialog.export-excel.success'));
            },
            () => {
              this.snackbarService.addMessage(this.translocoService.translate('anomaly.dialog.export-excel.error'));
            }
          );
        }
      });
  }

  reset(): void {
    this.form.reset();
    this.currentSavedSearch = null;
    this.filter(this.form.value);
  }

  destroy(): void {
  }
}
