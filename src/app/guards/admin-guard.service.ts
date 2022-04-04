import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CanActivate, Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

/** 
 * This service is used to protect Angular routes (views) by authorizing logged in users that have Admin Role
*/
@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private authService : AuthService, 
    private router: Router
  ) { }

  /**
   * It is called in the app.routing.module.ts file
   * It calls the authservice.isAdmin and gets a boolean answer whether the user has Admin role or not.
   * @returns An observable of type boolean to let Angular Router know whether to authorize access to the particular component(view) or not
   */
  canActivate(){
    return new Observable<boolean>(
      x => {
        this.authService
          .isAdmin()
          .subscribe(
            (msg) => { 
              x.next(true);
            },
            error => {
              this.router.navigate(['/']);
              x.next(false);
            }
          )
      }
    )
  }
}
