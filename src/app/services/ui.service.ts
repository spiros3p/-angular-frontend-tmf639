import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private subjectToListView = new Subject<any>();
  private subjectIsAuth = new Subject<any>();
  private subjectIsAdmin = new Subject<any>();

  constructor(
    // private authService: AuthService
  ) { }

  toggleListView(currentListView: boolean): void {
    this.subjectToListView.next(currentListView);
  }
  onToggleListView(): Observable<any> {
    return this.subjectToListView.asObservable();
  }

  onToggleAuth(): Observable<any> {
    return this.subjectIsAuth.asObservable();
  }
  toggleAuth(): void {
    // localStorage METHOD
    if (localStorage.getItem('currentUser')) {
      this.subjectIsAuth.next(true);
    } else {
      this.subjectIsAuth.next(false);
    }
    // Server request METHOD
    // this.authService
    //   .isAuthenticated()
    //   .subscribe(
    //     (msg) => {
    //       this.subjectIsAuth.next(true);
    //     },
    //     error => {
    //       this.subjectIsAuth.next(false);
    //     }
    //   )
  }

  onToggleAdmin(): Observable<any> {
    return this.subjectIsAdmin.asObservable();
  }
  toggleAdmin(): void {
    // localStorage METHOD
    if (JSON.parse(localStorage.getItem('currentUser') || "{}").admin == 1) {
      this.subjectIsAdmin.next(true);
    } else {
      this.subjectIsAdmin.next(false);
    }
    // Server request METHOD
    // this.authService
    //   .isAdmin()
    //   .subscribe(
    //     (msg) => {
    //       this.subjectIsAdmin.next(true);
    //     },
    //     error => {
    //       this.subjectIsAdmin.next(false);
    //     }
    //   )
  }

}
