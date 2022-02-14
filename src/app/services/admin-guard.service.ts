import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService : AuthService, 
    private router: Router
  ) { }

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
