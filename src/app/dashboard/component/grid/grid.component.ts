import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GridsterConfig} from 'angular-gridster2';
import {take} from 'rxjs/operators';
import {DashboardModel} from '../../model/dashboard.model';
import {MatDialog} from '@angular/material/dialog';
import {DashboardService} from '../../service/dashboard.service';
import {WidgetDataInterface} from '../../model/widget-data.interface';
import {AddWidgetDialogComponent} from '../dialog/add-widget-dialog.component';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {options} from '../../configuration/widget-option';
import {WidgetFactory} from '../widget/widget.factory';
import {BudgetStatsComponent} from '../../../budget/component/widget/budget-stats/budget-stats.component';
import {StorageService} from '../../../core/service/storage.service';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  fullName: string;
  edition = false;
  updated = false;
  options: GridsterConfig;
  dashboard: DashboardModel;
  components = [];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private translocoService: TranslocoService,
    private widgetFactory: WidgetFactory,
    private storageService: StorageService
  ) {
  }

  get widgets(): any {
    return this.dashboard.widgets.filter((widget: WidgetDataInterface) => {
      return this.components.filter(component => component.selector === widget.component).length > 0;
    });
  }

  set edit(edition: boolean) {
    this.edition = edition;
    // widget drag is enabled in edition mode only
    this.options.draggable.enabled = edition;
    // widgets resize is enabled in edition mode only
    this.options.resizable.enabled = edition;
    // apply new options value to the grid
    this.options.api.optionsChanged();
    // on mode change, the edition start or finish, there is no update to save
    this.dashboard.updated = false;
  }

  ngOnInit(): void {
    const user = this.authenticationService.currentUserValue;
    this.fullName = user.first_name + ' ' + user.last_name;

    this.components = this.widgetFactory.components;

    this.dashboard = this.dashboardService.loadUserDashboard();

    const draggable = {
      draggable: {
        stop: () => {
          this.dashboard.updated = true;
        },
        enabled: false,
      },
      resizable: {
        stop: () => {
          this.dashboard.updated = true;
        },
        enabled: false,
      }
    };

    this.options = Object.assign({}, options, draggable);
  }

  save(): void {
    this.dashboard.widgets.forEach(widget => {

      if (widget instanceof BudgetStatsComponent) {
        this.storageService.removeItem('consumed_chart_color');
        this.storageService.removeItem('expected_chart_color');
        this.storageService.removeItem('forecast_chart_color');

        this.storageService.setItem('consumed_chart_color', widget.settings.consumed_chart_color);
        this.storageService.setItem('expected_chart_color', widget.settings.expected_chart_color);
        this.storageService.setItem('forecast_chart_color', widget.settings.forecast_chart_color);
      }

      this.showWidget(widget);
    });
    this.dashboardService.saveUserDashboard(this.dashboard).subscribe(() => this.edit = false);
  }

  // Cancel modifications and reload last saved config
  cancel(): void {
    this.edit = false;
    this.dashboard = this.dashboardService.loadUserDashboard();
  }

  // Add selected widget (by name) to the dashboard widgets collection
  addWidget(componentSelector): void {
    this.edit = true;
    const widgetOptions = this.widgetFactory.getOptions(componentSelector);
    this.dashboard.addWidget(componentSelector, widgetOptions);
  }

  removeWidget(item): void {
    this.dashboard.removeWidget(item);
  }

  selectWidget(item): void {
    if (this.edition) {
      this.options.draggable.enabled = !item.isEditing;
      this.options.api.optionsChanged();
    }
  }

  editWidget(item): void {
    this.options.draggable.enabled = false;
    this.options.api.optionsChanged();
    item.isEditing = true;
    item.instance.edit(true);
  }

  showWidget(item): void {
    this.options.draggable.enabled = true;
    this.options.api.optionsChanged();
    if (!!item?.instance?.edit) {
      item.isEditing = false;
      item.instance.edit(false);
    }
  }

  addWidgetModal(): void {
    this.dialog
      .open(AddWidgetDialogComponent, {
        minWidth: '80vw',
        minHeight: '80vh',
        data: {
          widgets: this.components
        }
      }).afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (!!result) {
          this.addWidget(result.selector);
        }
      });
  }
}
