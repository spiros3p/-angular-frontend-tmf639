import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { UiService } from 'src/app/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UiService
  ) { }

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
              this.uiService.toggleAuth();
              this.router.navigate(['/login']);
              x.next(false);
            }
          )
      }
    )
  }

}
