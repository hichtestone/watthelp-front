import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliveryPointInvoiceInterface} from '../../../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {take} from 'rxjs/operators';
import {ItemAnalysesInterface} from '../../../../../invoice/model/delivery-point-invoice/item-analyses.interface';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.scss']
})
export class InvoiceInfoComponent implements OnInit {
  deliveryPointInvoice: DeliveryPointInvoiceInterface;
  title = 'deliverypoint.breadcrumb.invoice-details';

  totalSubscriptionConsumption = 0;
  totalTaxes = 0;
  totalExcludedVAT = 0;

  // VAT 5.50 %
  totalVAT550 = 0;
  excludedVAT550 = 0.0;

  // VAT 20.00 %
  totalVAT2000 = 0;
  excludedVAT2000 = 0.0;

  totalExcludedVATForSpecificArea = 0.0;
  totalVATForSpecificArea = 0.0;

  subscriptionTotal = 0.0;
  consumptionTotal = 0.0;

  itemAnalyses: ItemAnalysesInterface[];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(take(1))
      .subscribe((data: { deliveryPointInvoice: DeliveryPointInvoiceInterface }) => {

        this.deliveryPointInvoice = data.deliveryPointInvoice;

        // Populating item analyses
        if (!!this.deliveryPointInvoice.delivery_point_invoice_analysis) {
          this.itemAnalyses = this.deliveryPointInvoice.delivery_point_invoice_analysis.item_analyses;
        }

        this.subscriptionTotal = this.deliveryPointInvoice.subscription?.total;
        this.consumptionTotal = this.deliveryPointInvoice.consumption?.total;

        // Compute totalSubscriptionConsumption
        this.totalSubscriptionConsumption = this.subscriptionTotal + this.consumptionTotal;

        // Compute VAT
        this.deliveryPointInvoice.taxes.forEach(tax => {
          this.totalTaxes = this.totalTaxes + tax.total;

          if (tax.type === 'cta') {
            this.totalVAT550 = this.deliveryPointInvoice.subscription.total + tax.total;
          } else {
            this.totalVAT2000 = this.totalVAT2000 + tax.total;
          }
        });

        this.totalVAT2000 = this.totalVAT2000 + this.deliveryPointInvoice.consumption.total;

        this.excludedVAT550 = this.digitNumberFormatter((this.totalVAT550 * 5.50) / 100);
        this.excludedVAT2000 = this.digitNumberFormatter((this.totalVAT2000 * 20) / 100);
        this.totalExcludedVAT = this.digitNumberFormatter((this.excludedVAT550 + this.excludedVAT2000) / 10 ** 7);

        this.totalExcludedVATForSpecificArea = this.digitNumberFormatter((this.totalSubscriptionConsumption + this.totalTaxes) / 10 ** 7);
        this.totalVATForSpecificArea = this.digitNumberFormatter(this.totalExcludedVATForSpecificArea + this.totalExcludedVAT);
      });
  }

  digitNumberFormatter(value: number): number {
    return Number(value.toFixed(2));
  }
}
