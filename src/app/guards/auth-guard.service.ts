import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

/**
* This service is used to protect Angular routes (views) by authorizing a logged in users
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UiService
  ) { }

  /**
  * It is called in the app.routing.module.ts file
  * It calls the authservice.isAuthenticated and gets a boolean answer whether the user (session) is authenticated with the server or not.
  * @returns An observable of type boolean to let Angular Router know whether to authorize access to the particular component(view) or not
  */
  canActivate() {
    return new Observable<boolean>(
      x => {
        this.authService
          .isAuthenticated()
          .subscribe(
            (msg) => {
              x.next(true);
            },
            error => {
              localStorage.clear();
              this.uiService.checkAuth();
              this.router.navigate(['/login']);
              x.next(false);
            }
          )
      }
    )
  }

}
