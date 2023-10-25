import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'analyzer',
  pure: false
})
export class AnalyzerPipe implements PipeTransform {
  values = {
    'delivery_point_invoice.index': 'Index',
    'delivery_point_invoice.index_date': 'Date d\'index',
    'delivery_point_invoice.one_year_estimated': 'Un an de facture estimée',
    'delivery_point_invoice.one_year_no_invoice': 'Un an sans facture',
    'delivery_point_invoice.total_tax': 'Montant TVA',
    'delivery_point_invoice.total_tax_excluded': 'Montant HT',
    'delivery_point_invoice.total_tax_included': 'Montant TTC',
    'delivery_point_invoice.subscription.turpe': 'TURPE',
    'delivery_point_invoice.consumption.date_finished_at': 'Date de fin',
    'delivery_point_invoice.consumption.date_started_at': 'Date de début',
    'delivery_point_invoice.consumption.max_power_exceeded': 'Puissance dépassée',
    'delivery_point_invoice.consumption.one_year_consumption': 'Un an sans consommation',
    'delivery_point_invoice.consumption.one_year_diff': 'Différence de consommation',
    'delivery_point_invoice.consumption.quantity': 'Quantité',
    'delivery_point_invoice.consumption.total_tax_excluded': 'Montant HT',
    'delivery_point_invoice.consumption.unit_price': 'Prix unitaire',
    'delivery_point_invoice.subscription.date_started_at': 'Date de début',
    'delivery_point_invoice.subscription.quantity': 'Quantité',
    'delivery_point_invoice.subscription.total_tax': 'Montant HT',
    'delivery_point_invoice.subscription.unit_price': 'Prix unitaire',
    'delivery_point_invoice.tax.cta.total_tax_excluded': 'CTA : Montant HT',
    'delivery_point_invoice.tax.cspe.total_tax_excluded': 'CSPE : Montant HT',
    'delivery_point_invoice.tax.tccfe.total_tax_excluded': 'TCCFE : Montant HT',
    'delivery_point_invoice.tax.tdcfe.total_tax_excluded': 'TDCFE : Montant HT',
    'delivery_point_invoice.tax.tcfe.total_tax_excluded': 'TCFE : Montant HT',
    'delivery_point_invoice.power_subscribed': 'Puissance souscrite',
    'delivery_point_invoice.subscription.subscription_exceeds_consumption': 'Montant abo > Montant conso'
  };

  transform(value: string): any {
    if (!value) {
      return '';
    }

    return this.values[value];
  }
}
