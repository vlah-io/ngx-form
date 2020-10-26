import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'vlahio-date-input',
  template: `
    <div class="form-group" [formGroup]="form">
      <ng-template [ngIf]="label">
        <label [ngClass]="{'vlahio-req': req}">{{label}}</label>
      </ng-template>
      <div class="input-group">
        <input type="text"
               class="form-control"
               [attr.placeholder]="placeholder"
               [formControlName]="controlName"
               ngbDatepicker
               #d="ngbDatepicker"
               (click)="d.open()"
               [outsideDays]="'visible'"
               [placement]="['bottom', 'left', 'right', 'top']"
               [container]="'body'"
               [displayMonths]="2"/>
        <div class="input-group-append">
          <span class="input-group-text vlahio-cs-p" (click)="d.toggle()">
            <i class="far fa-calendar-alt"></i>
          </span>
        </div>
      </div>
    </div>
  `
})
export class DateInputComponent {
  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() label: string;
  @Input() req = false;
  @Input() form: FormGroup;
}
