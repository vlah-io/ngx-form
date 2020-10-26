import {Component, Self} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {
  VLAHIO_FORM_CONFIG,
  VLAHIO_FORM_CRUD_SERVICE,
  VLAHIO_FORM_MODEL
} from '../../../ngx-form/src/lib/service/injection-token';
import {NgbDateLocalAdapter} from '../../../ngx-form/src/lib/service/NgbDateLocalAdapter';
import {NgbDateParserLocalFormatter} from '../../../ngx-form/src/lib/service/NgbDateParserLocalFormatter';
import {FormWorker} from '../../../ngx-form/src/lib/worker/form.worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FormWorker,
    {
      provide: VLAHIO_FORM_CONFIG,
      useValue: {
        locale: 'en-US'
      }
    },
    {
      provide: VLAHIO_FORM_MODEL,
      useValue: {
        currency: 12345.01,
        gbp: 1256365,
        usd: 85369,
        eur: 845635,
        date: '2019-04-22T00:00:00+00:00',
        email: 'some@email.com',
        numeric: 486,
        numeric2: 88,
        percentage: 24,
        text: 'Some super fine text',
        password: null,
        passwordConfirmation: null,
        selectWaitingForInput: null,
        selectNoResults: null,
        selectLoading: null,
        select: {
          id: 23,
          name: 'Some option'
        },
        select2: null,
        elasticTextarea: null
      }
    },
    {
      provide: VLAHIO_FORM_CRUD_SERVICE,
      useValue: {}
    },
    {provide: NgbDateAdapter, useClass: NgbDateLocalAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateParserLocalFormatter}
  ]
})
export class AppComponent {
  title = 'ngx-form-test';

  constructor(@Self() public formWorker: FormWorker) {
  }
}
