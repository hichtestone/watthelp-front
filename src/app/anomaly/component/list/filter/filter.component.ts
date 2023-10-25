import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SavedSearch} from '../../../../core/model/saved-search.model';
import * as moment from 'moment';
import {AbstractFormComponent} from '../../../../core/component/abstract-form.component';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {debounceTime} from 'rxjs/operators';
import {enumToArray} from "../../../../core/enum/enum-converter";
import {ProfitEnum} from "../../../enum/profit-enum";

@Component({
  selector: 'app-anomaly-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends AbstractFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() savedSearches: SavedSearch[];

  @Output() save = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() deleteSavedSearch = new EventEmitter();
  @Output() currentSavedSearchChange = new EventEmitter<SavedSearch>();
  profits = enumToArray(ProfitEnum);

  _currentSavedSearch: SavedSearch;

  get currentSavedSearch(): SavedSearch {
    return this._currentSavedSearch;
  }

  @Input()
  set currentSavedSearch(currentSavedSearch: SavedSearch) {
    if (!!currentSavedSearch) {
      this.form.patchValue(this.prepareDataToPatch(currentSavedSearch.values));
    }

    this._currentSavedSearch = currentSavedSearch;

    this.currentSavedSearchChange.emit(this.currentSavedSearch);
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(untilDestroyed(this, 'destroy'), debounceTime(500)).subscribe((values) => {
      // Ensure that when the form changes, send both date values but not separately
      this.filter.emit(this.prepareFilterToEmit(values));
    });
  }

  deleteSearch(): void {
    this.deleteSavedSearch.emit();
  }

  saveForm(): void {
    this.save.emit(this.prepareFiltersToSend(this.form.value));
  }

  prepareFiltersToSend(values): any {
    return {
      ...values,
      created_from: values.created_from ? moment(values.created_from).format('YYYY-MM-DD') : null,
      created_to: values.created_to ? moment(values.created_to).format('YYYY-MM-DD') : null,
      total: values.total * (10 ** 7),
      profit: values.profit
    };
  }

  prepareFilterToEmit(values): any {
    const date = {
      from: (values.created_from && values.created_to) ? moment(values.created_from).format('YYYY-MM-DD') : null,
      to: (values.created_from && values.created_to) ? moment(values.created_to).format('YYYY-MM-DD') : null,
    };

    if (!!values.profit) {
      return !!date.from && !!date.to
        ? {
          created: {
            from: date.from,
            to: date.to,
          },
          total: (values.total || (values.total && values.created_from && values.created_to))
            ? this.parseValueToInt(values.total, 10 ** 7)
            : null,
          profit: values.profit
        }
        : {
          total: (values.total || (values.total && values.created_from && values.created_to))
            ? this.parseValueToInt(values.total, 10 ** 7)
            : null,
          profit: values.profit
        };

    } else {
      return !!date.from && !!date.to
        ? {
          created: {
            from: date.from,
            to: date.to,
          },
          total: (values.total || (values.total && values.created_from && values.created_to))
            ? this.parseValueToInt(values.total, 10 ** 7)
            : null
        }
        : {
          total: (values.total || (values.total && values.created_from && values.created_to))
            ? this.parseValueToInt(values.total, 10 ** 7)
            : null
        };
    }


  }

  prepareDataToPatch(values): any {
    return {
      ...values,
      total: values.total ? values.total / (10 ** 7) : null
    };
  }

  onValueChange(value: any): void {
    if (!value) {
      this.form.reset();
      this.filter.emit(this.prepareFilterToEmit(this.form.value));
    }
  }

  destroy(): void {
  }
}
