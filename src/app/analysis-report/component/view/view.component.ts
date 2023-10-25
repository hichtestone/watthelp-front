import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportAnalysisInterface} from '../../model/report-analysis.interface';
import {AnalysisInterface} from "../../../invoice/model/invoice/analysis.interface";


@Component({
    selector: 'app-report-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    reportAnalysis: ReportAnalysisInterface | AnalysisInterface;

    constructor(protected route: ActivatedRoute, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: { reportAnalysis: ReportAnalysisInterface }) => {
                this.reportAnalysis = data.reportAnalysis;
            });
    }
}
