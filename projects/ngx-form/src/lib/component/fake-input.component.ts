import {Component, Input} from '@angular/core';

@Component({
  selector: 'vlahio-fake-input',
  template: `
    <div class="vlahio-form-group">
      <ng-template [ngIf]="label">
        <label [ngClass]="{'vlahio-req': required}">{{label}}</label>
      </ng-template>
      <div class="vlahio-form-control"
           [ngClass]="{'vlahio-readonly': readonly, 'vlahio-right': textToTheRight}">{{value}}</div>
    </div>
  `
})
export class FakeInputComponent {
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() textToTheRight: boolean;
  @Input() label: string;
  @Input() value: string;
}
