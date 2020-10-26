import {InjectionToken} from '@angular/core';
import {HttpAbstract} from '@vlah.io/ngx-worker';
import {FormConfigInterface, FormModelInterface} from '../interface/ngx-form.interface';

export const VLAHIO_FORM_CONFIG = new InjectionToken<FormConfigInterface>('VLAHIO_FORM_CONFIG');
export const VLAHIO_FORM_MODEL = new InjectionToken<FormModelInterface>('FORM_MODEL');
export const VLAHIO_FORM_CRUD_SERVICE = new InjectionToken<HttpAbstract>('VLAHIO_FORM_CRUD_SERVICE');
