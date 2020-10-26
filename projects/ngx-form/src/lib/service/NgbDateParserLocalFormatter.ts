import {Inject, Injectable} from '@angular/core';
import {DateHelper} from '@vlah.io/ngx-helper';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormConfigInterface} from '../interface/ngx-form.interface';
import {VLAHIO_FORM_CONFIG} from './injection-token';

@Injectable({
  providedIn: 'root'
})
export class NgbDateParserLocalFormatter extends NgbDateParserFormatter {
  constructor(@Inject(VLAHIO_FORM_CONFIG) private configs: FormConfigInterface) {
    super();
  }

  parse(value: string): NgbDateStruct {
    if (value) {
      value = value.trim();
      let arr = value.split('-');
      if (this.configs.locale === 'en-US') {
        arr = value.split('/');

        return {
          year: arr[2] ? +arr[2] : null,
          month: +arr[0],
          day: +arr[1] ? +arr[1] : null
        };
      }

      return {
        year: arr[2] ? +arr[2] : null,
        month: arr[1] ? +arr[1] : null,
        day: +arr[0]
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }


    if (this.configs.locale === 'en-US') {
      return `${DateHelper.pad(date.month)}/${DateHelper.pad(date.day)}/${date.year}`;
    }

    return `${DateHelper.pad(date.day)}-${DateHelper.pad(date.month)}-${date.year}`;
  }
}
