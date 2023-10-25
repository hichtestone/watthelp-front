import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent} from '../../../delivery-point/component/list/table/table.component';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {ApiDataSource} from '../../../core/datasource/api.datasource';
import {ImportReportInterface} from '../../model/import-report.interface';
import {ImportReportService} from '../../service/import-report.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    dataSource: ApiDataSource<ImportReportInterface> | null;

    @ViewChild('table', {static: true}) table: TableComponent;
    form: FormGroup;

    constructor(
        private dialog: MatDialog,
        private snackbarService: SnackbarService,
        private importReportService: ImportReportService
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new ApiDataSource<ImportReportInterface>(
            this.importReportService,
            this.table.paginator,
            this.table.sort,
            'import_report_invoices,import_report_pricings,import_report_import,invoice_import_user,invoice_import_file'
        );

        this.table.sort.sort({id: 'created_at', start: 'asc', disableClear: false});
    }
}
