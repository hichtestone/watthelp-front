import {Component, NgZone, OnInit} from '@angular/core';
import {BudgetService} from '../../../service/budget.service';
import {SnackbarService} from '../../../../core/service/snackbar.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliveryPointBudgetInterface} from '../../../model/delivery-point-budget.interface';
import {MapsAPILoader} from '@agm/core';
import {AbstractFormComponent} from '../../../../core/component/abstract-form.component';
import {debounceTime} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../../../../core/component/dialog-confirm/dialog-confirm.component';
import {DeliveryPointBudgetComputingService} from '../../../service/delivery-point-budget-computing.service';
import * as moment from 'moment';
import {YearComparison} from '../../../../core/validator/year.validator';
import {AclService} from "../../../../core/service/acl.service";
import {Permission} from "../../../../role/model/permission/permission-constant";

@Component({
  selector: 'app-edit-delivery-point-budget',
  templateUrl: './edit-delivery-point-budget.component.html',
  styleUrls: ['./edit-delivery-point-budget.component.scss']
})
export class EditDeliveryPointBudgetComponent extends AbstractFormComponent implements OnInit {
  title = 'Edition de budget de point de livraison';
  isLoading = false;
  assistEnabled = true;
  powerWarning = false;
  newPowerWarning = false;
  zoom = 9;
  pattern = '[0-9]+([.][0-9]{1,2})?';

  marker;
  form: FormGroup;
  deliveryPointBudget: DeliveryPointBudgetInterface;
  confirmationDescription = '<p>La case <span style="font-weight: bold; font-style: italic">"Réalisation après travaux?"</span> est décochée.' +
    '<br><br>Toutes les données de la section <span style="font-weight: bold; font-style: italic">"Consommation prévisionnelle annuelle après travaux"</span>' +
    ' seront perdues après la sauvegarde.<br><br> Êtes-vous sûr de vouloir continuer ?</p>';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private budgetService: BudgetService,
    private aclService: AclService,
    private deliveryPointBudgetComputingService: DeliveryPointBudgetComputingService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { deliveryPointBudget: DeliveryPointBudgetInterface }) => {

        this.deliveryPointBudget = data.deliveryPointBudget;

        this.form = this.fb.group({
            reference: '',
            address: '',
            meter_reference: '',
            power: '',
            renovation: '',
            renovated_at: '',
            installed_power: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
            equipment_power_percentage: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
            gradation: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
            gradation_hours: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            sub_total_consumption: ['', Validators.pattern(this.pattern)],
            total_consumption: ['', Validators.pattern(this.pattern)],
            total: ['', Validators.pattern(this.pattern)]
          },
          {
            validators: YearComparison('renovated_at', this.deliveryPointBudget?.budget?.year)
          });

        this.onRenovationChange(this.deliveryPointBudget);
        this.checkPower(this.form.value);

        this.form.patchValue(this.prepareDataToPatch(this.deliveryPointBudget));

        if (!this.aclService.hasAccess(Permission.BUDGET_EDIT)) {
          this.form.disable();
        }

        this.getGeoLocation(this.deliveryPointBudget.delivery_point.address);

        this.subscribeFormChange();
      });

  }

  getGeoLocation(address: string): void {
    this.mapsAPILoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.ngZone.run(() => {
            this.zoom = 11;
            this.marker = {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng()
            };
          });
        } else {
          throw new Error(`Error: ${status}`);
        }
      });
    });
  }

  prepareDataToPatch(values: any): any {

    return {
      ...values,
      address: values.delivery_point.address,
      reference: values.delivery_point.reference,
      meter_reference: values.delivery_point.meter_reference,
      power: values.delivery_point.power,

      equipment_power_percentage: values.equipment_power_percentage ? this.parseValueToString(values.equipment_power_percentage, 100) : '0.00',
      gradation: !!values.gradation && values.gradation !== 0 ? this.parseValueToString(values.gradation, 100) : '0.00',
      gradation_hours: !!values.gradation_hours ? values.gradation_hours / 100 : 0,
      sub_total_consumption: values.sub_total_consumption ? this.parseValueToString(values.sub_total_consumption, 100) : null,

      new_equipment_power_percentage: values.new_equipment_power_percentage ? this.parseValueToString(values.new_equipment_power_percentage, 100) : '0.00',
      new_gradation: values.new_gradation ? this.parseValueToString(values.new_gradation, 100) : '0.00',
      new_gradation_hours: values.new_gradation_hours ? values.new_gradation_hours / 100 : 0,
      new_sub_total_consumption: values.new_sub_total_consumption ? this.parseValueToString(values.new_sub_total_consumption, 100) : null,

      total_consumption: values.total_consumption ? this.parseValueToString(values.total_consumption, 100) : 0,
      total: values.total ? this.parseValueToString(values.total, 10 ** 7) : 0,
    };
  }


  submit(): void {
    if (!this.form.controls.renovation.value) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '400px',
        data: {
          title: 'Confirmation avant sauvegarde',
          description: this.confirmationDescription
        }
      });

      dialogRef.afterClosed().subscribe(confirm => {
        if (!!confirm) {
          this.updateDeliveryPoint();
        }
      });

    } else {
      this.updateDeliveryPoint();
    }
  }


  updateDeliveryPoint(): void {
    const values = this.prepareDataToSubmit(this.form.getRawValue());
    values.delivery_point = this.deliveryPointBudget.delivery_point.id;

    this.budgetService.updateDeliveryPointBudget(this.deliveryPointBudget.budget.id, this.deliveryPointBudget.id, values)
      .subscribe(() => {
          this.snackbarService.addMessage('Budget de point de livraison mis à jour avec succès !');
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        (error) => {
          this.handleFormError(error);
        });
  }

  prepareDataToSubmit(values: any): any {
    return {
      installed_power: values.installed_power,
      renovation: values.renovation,
      renovated_at: !!values.renovation ? moment(values.renovated_at).format('YYYY-MM-DD') : null,
      equipment_power_percentage: values.gradation ? this.parseValueToInt(values.equipment_power_percentage, 100) : 0,
      gradation: !!values.gradation ? this.parseValueToInt(values.gradation, 100) : 0,
      gradation_hours: values.gradation_hours ? values.gradation_hours * 100 : 0,
      sub_total_consumption: values.sub_total_consumption ? this.parseValueToInt(values.sub_total_consumption, 100) : null,
      new_installed_power: !!values.renovation ? parseFloat(values.new_installed_power) : null,
      new_equipment_power_percentage: !!values.renovation ? (values.new_equipment_power_percentage ? this.parseValueToInt(values.new_equipment_power_percentage, 100) : 0) : null,
      new_gradation: !!values.renovation ? this.parseValueToInt(values.new_gradation, 100) : null,
      new_gradation_hours: !!values.renovation ? (values.new_gradation_hours ? values.new_gradation_hours * 100 : 0) : null,
      new_sub_total_consumption: !!values.renovation ? this.parseValueToInt(values.new_sub_total_consumption, 100) : null,
      total_consumption: values.total_consumption ? this.parseValueToInt(values.total_consumption, 100) : null,
      total: values.total ? this.parseValueToInt(values.total, 10 ** 7) : null
    };
  }

  onRenovationChange(deliveryPointBudget: DeliveryPointBudgetInterface): void {
    this.form.controls.renovation.valueChanges.subscribe(value => {
      if (!!value || !!deliveryPointBudget.renovation) {
        this.form.addControl('renovated_at', new FormControl('', Validators.required));
        this.form.addControl('new_installed_power', new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.pattern)])));
        this.form.addControl('new_equipment_power_percentage', new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.pattern)])));
        this.form.addControl('new_gradation', new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.pattern)])));
        this.form.addControl('new_gradation_hours', new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])));
        this.form.addControl('new_sub_total_consumption', new FormControl('', Validators.pattern(this.pattern)));

      } else {
        this.form.removeControl('renovated_at');
        this.form.removeControl('new_installed_power');
        this.form.removeControl('new_equipment_power_percentage');
        this.form.removeControl('new_gradation');
        this.form.removeControl('new_gradation_hours');
        this.form.removeControl('new_sub_total_consumption');
      }
    });
  }

  destroy(): void {
  }

  private subscribeFormChange(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this, 'destroy'), debounceTime(500))
      .subscribe((value) => {

        this.checkPower(value);

        if (this.assistEnabled) {
          const result = this.deliveryPointBudgetComputingService.consumptionData(value, this.deliveryPointBudget);

          if (value.equipment_power_percentage && parseFloat(value.equipment_power_percentage) === 0) {
            this.form.controls.equipment_power_percentage.patchValue('0.00');
          }

          if (value.gradation && parseFloat(value.gradation) === 0 && parseFloat(value.gradation_hours) !== 0) {
            this.form.controls.gradation_hours.patchValue(0);
            this.form.controls.gradation.patchValue('0.00');
          }

          if (value.gradation && value.installed_power && value.gradation_hours && result?.sub_total_consumption) {
            this.form.controls.sub_total_consumption.patchValue(result.sub_total_consumption, {emitEvent: false});
          }

          if (value.new_gradation && parseFloat(value.new_gradation) === 0 && parseFloat(value.new_gradation_hours) !== 0) {
            this.form.controls.new_gradation_hours.patchValue(0);
            this.form.controls.new_gradation.patchValue('0.00');
          }

          if (value.renovation && result?.new_sub_total_consumption) {
            this.form.controls.new_sub_total_consumption.patchValue(result.new_sub_total_consumption, {emitEvent: false});
          }

          if (result?.total_consumption && result?.total) {
            this.form.controls.total_consumption.patchValue(result.total_consumption, {emitEvent: false});
            this.form.controls.total.patchValue(result.total, {emitEvent: false});
          }

          // Recompute total_consumption and total values when the renovation checkbox has not been checked or unchecked
          if (!value.renovation && value.installed_power && value.gradation && value.gradation_hours) {
            this.form.controls.total_consumption.patchValue(result?.total_consumption, {emitEvent: false});
            this.form.controls.total.patchValue(result?.total, {emitEvent: false});
          }

          // Rep-patch value because the event has been set to false to avoid infinite loop specially when the field
          // has been updated
          this.form.controls.sub_total_consumption.patchValue(result.sub_total_consumption);
        }
      });
  }

  private checkPower(value: any): void {
    this.powerWarning = value.installed_power > parseInt(this.deliveryPointBudget.delivery_point.power, 10) * 1.25;
    this.newPowerWarning = value.new_installed_power > parseInt(this.deliveryPointBudget.delivery_point.power, 10) * 1.25;
  }
}
