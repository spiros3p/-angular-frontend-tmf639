import { Injectable } from '@angular/core';
// import * as alertify from 'alertifyjs';

/**
 * Import alertify from your node_modules
 */
declare let alertify: any;

/**
 * this service is used to inject the Alertify plugin to our SPA
 */
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

/**
 * When called it shows an alert window for a small period of time
 * @param {string} message the content appearing in the window
 * @param okCallback 
 */
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  /**
   * When called it shows an alert window for a small period of time
   * @param {string} message the content appearing in the window
   */
  success(message: string) {
    alertify.success(message);
  }

  /**
   * When called it shows an alert window for a small period of time
   * @param {string} message the content appearing in the window
   */
  error(message: string) {
    alertify.error(message);
  }

  /**
   * When called it shows an alert window for a small period of time
   * @param {string} message the content appearing in the window
   */
  warning(message: string) {
    alertify.warning(message);
  }

  /**
   * When called it shows an alert window for a small period of time
   * @param {string} message the content appearing in the window
   */
  message(message: string) {
    alertify.message(message);
  }

}
