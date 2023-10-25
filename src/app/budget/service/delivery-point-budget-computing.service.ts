import {Injectable} from '@angular/core';
import {DeliveryPointBudgetInterface} from '../model/delivery-point-budget.interface';
import {ConsumptionComputeInterface} from '../model/consumption-compute-interface';
import {ConsumptionDataInterface} from '../model/consumption-data-interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPointBudgetComputingService {
  result: ConsumptionComputeInterface;

  consumptionData(value: ConsumptionDataInterface, deliveryPointBudget: DeliveryPointBudgetInterface): ConsumptionComputeInterface {
    let subTotalConsumption = 0;
    let newSubTotalConsumption = 0;
    const renovationDate = moment(value.renovated_at);
    const renovationYear = renovationDate.year();
    const startedDate = moment(renovationYear + '-01-01', 'YYYY-MM-DD');

    // Perform a year checking and populate the numberOfDaysInAYear variable whether it's a leap year or not
    const numberOfDaysInAYear = moment(renovationYear).isLeapYear() ? 366 : 365;

    const renovationDays = numberOfDaysInAYear - renovationDate.diff(startedDate, 'days') || numberOfDaysInAYear;

    if (value.installed_power && value.equipment_power_percentage) {
      const installedPower = parseFloat(value.installed_power);
      const equipmentPowerPercentage = parseFloat(value.equipment_power_percentage);
      const budgetTotalHours = parseFloat(deliveryPointBudget.budget.total_hours.toString());

      let gradationHours = parseFloat(value.gradation_hours);
      const gradation = parseFloat(value.gradation);

      if (gradation === 0) {
        gradationHours = 0;
      }

      subTotalConsumption = installedPower * (1 + equipmentPowerPercentage / 100) *
        ((budgetTotalHours - gradationHours) + (gradationHours * gradation / 100));

      this.result = {...this.result, sub_total_consumption: subTotalConsumption.toFixed(2)};
    }

    if (value.renovation
      && value.renovated_at
      && value.new_installed_power
      && value.new_equipment_power_percentage
      && value.new_gradation
      && value.new_gradation_hours) {

      const newGradation = parseFloat(value.new_gradation);
      let newGradationHours = parseFloat(value.new_gradation_hours);

      if (newGradation === 0) {
        newGradationHours = 0;
      }

      const newEquipmentPowerPercentage = parseFloat(value.new_equipment_power_percentage);
      const newConsumptionWithoutGradation = parseFloat(value.new_installed_power) * (1 + newEquipmentPowerPercentage / 100);
      const newConsumptionWithGradation = newConsumptionWithoutGradation * newGradation / 100;

      const totalHours = parseFloat(deliveryPointBudget.budget.total_hours.toString());

      const durationGradation = newGradationHours;
      const durationNoGradation = totalHours - newGradationHours;

      const consumptionNoGradation = newConsumptionWithoutGradation * durationNoGradation;
      const consumptionGradation = newConsumptionWithGradation * durationGradation;

      newSubTotalConsumption = consumptionNoGradation + consumptionGradation;

      if (value.new_sub_total_consumption !== newSubTotalConsumption.toFixed(2)) {
        this.result = {
          ...this.result,
          new_sub_total_consumption: newSubTotalConsumption.toFixed(2)
        };
      }
    }

    const totalConsumptionBeforeRenovation = subTotalConsumption / numberOfDaysInAYear * renovationDays;
    const totalConsumptionAfterRenovation = newSubTotalConsumption / numberOfDaysInAYear * (numberOfDaysInAYear - renovationDays);

    const totalConsumption = totalConsumptionBeforeRenovation + totalConsumptionAfterRenovation;

    const withRenovation = totalConsumption !== 0
      && value.renovation
      && value.renovated_at
      && value.new_installed_power
      && value.new_equipment_power_percentage
      && value.new_gradation
      && value.new_gradation_hours;

    if (withRenovation) {
      this.result = {
        ...this.result,
        total_consumption: totalConsumption.toFixed(2)
      };

      if (deliveryPointBudget.budget.average_price) {
        const total = totalConsumption * parseFloat(deliveryPointBudget.budget.average_price.toString());

        if (value.total !== total.toFixed(2)) {

          this.result = {
            ...this.result,
            total: (total / 10 ** 7).toFixed(2)
          };
        }
      }
    }

    if (!value.renovation && value.installed_power && value.gradation && value.gradation_hours) {
      const updatedSubTotalConsumption = parseFloat(this.result?.sub_total_consumption);
      const averagePrice = deliveryPointBudget.budget.average_price;
      const totalUpdated = ((updatedSubTotalConsumption * averagePrice) / 10 ** 7).toFixed(2);

      this.result = {
        ...this.result,
        total_consumption: updatedSubTotalConsumption.toString(),
        total: totalUpdated
      };
    }

    return this.result;
  }
}
