import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'vlahio-select-box',
  template: `
    <div class="form-group">
      <ng-template [ngIf]="label">
        <label class="col-form-label"
               [ngClass]="{'vlahio-req': required}">{{label}}</label>
      </ng-template>
      <ng-template [ngIf]="options && options.length">
        <div [formGroup]="form">
          <select class="form-control"
                  [formControlName]="controlName"
                  [compareWith]="compareFn">
            <option [ngValue]="defaultValue">{{defaultValue || ''}}</option>
            <ng-template ngFor let-option [ngForOf]="options">
              <option [ngValue]="returnObj ? option : option[keyName]">
                {{option[valueName]}}
              </option>
            </ng-template>
          </select>
        </div>
      </ng-template>
      <ng-template [ngIf]="!options || !options.length">
        <div class="form-control vlahio-disabled">
          <vlahio-loading [isVisible]="loading"></vlahio-loading>
          <ng-template [ngIf]="!loading && !options">
            <vlahio-text-cell [txt]="message || 'vlahio.waiting_for_input' | translate"
                           [cls]="'text-grey-clean'"></vlahio-text-cell>
          </ng-template>
          <ng-template [ngIf]="options && !options.length">
            <vlahio-text-cell [txt]="'vlahio.no_results' | translate"
                           [cls]="'text-grey-clean'"></vlahio-text-cell>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `
})
export class SelectBoxComponent {
  options: null | object[];

  @Input() defaultValue: string | null = null;
  @Input() keyName = 'id';
  @Input() valueName = 'name';
  @Input() message: string;
  @Input() returnObj = false;
  @Input() required = false;
  @Input() label: string;
  @Input() controlName: string;
  @Input() loading: boolean;
  @Input() form: FormGroup;

  @Input('options')
  set _options(options: any) {
    if (options) {
      options.forEach((value: string | object, key: number) => {
        if (
          Object.prototype.toString.call(value) === '[object String]'
          ||
          Object.prototype.toString.call(value) === '[object Number]'
        ) {
          const obj = {};
          obj[this.keyName] = value;
          obj[this.valueName] = value;
          options[key] = obj;
        }
      });
    }
    this.options = options;
  }

  compareFn = (a: null | object, b: null | object): boolean => {
    if (this.returnObj && a && b) {
      return a[this.keyName] === b[this.keyName];
    }

    if (Object.prototype.toString.call(a) === '[object Object]') {
      return a[this.keyName] === b;
    }

    return a === b;
  }
}
