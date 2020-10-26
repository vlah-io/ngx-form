import {Injectable} from '@angular/core';
import {DateHelper} from '@vlah.io/ngx-helper';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateLocalAdapter extends NgbDateAdapter<string> {
  fromModel(str: string): NgbDateStruct {
    if (!str) {
      return null;
    }

    const date = new Date(str);
    return (date && date.getFullYear() && (+date.getMonth() + 1) && date.getDate())
      ?
      {
        year: date.getFullYear(),
        month: +date.getMonth() + 1,
        day: date.getDate()
      }
      :
      null;
  }

  toModel(date: NgbDateStruct): string {
    return date && date.year && date.month && date.day
      ?
      DateHelper.toUTCAtomDate(new Date(date.year, date.month - 1, date.day, 12))
      :
      null;
  }
}
