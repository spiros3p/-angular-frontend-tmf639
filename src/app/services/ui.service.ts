import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// import { AuthService } from './auth.service';

/**
 * This service is used to handle UI changes that need be communicated between different components/modules
 */

@Injectable({
  providedIn: 'root'
})
export class UiService {
  /**
   * An angular subject that returns as observable to a component and then the component subscribes to it from its constructor
   * About toggling between List and Grid view of Resources
   */
  private subjectToListView = new Subject<any>();
  /**
   * An angular subject that returns as observable to a component and then the component subscribes to it from its constructor
   * About checking if there is an authenticated user
   */
  private subjectIsAuth = new Subject<any>();
  /**
   * An angular subject that returns as observable to a component and then the component subscribes to it from its constructor
   * About checking if the logged in user has role of Admin
   */
  private subjectIsAdmin = new Subject<any>();

  /**
   * Does nothing. Unless you choose to use Request from server to check Authentication of the User instead of local.storage
   */
  constructor(
    // private authService: AuthService
  ) { }

  /**
   * This function works along toggleListView function and handles the UI change (toggles) on Viewing the Resources
   * Call it in the constructor and subscribe to it.
   * @returns An angular observable that a components subscribes from its constructor
   */
  onToggleListView(): Observable<any> {
    return this.subjectToListView.asObservable();
  }
  /**
   * This function works along onToggleListView function and handles the UI change (toggles) on Viewing the Resources
   * Fire that function when you want its coresponding observable to check for changes
   * @param {boolean} currentListView This is a boolean that toggles between the 2 available views for Resources
   */
  toggleListView(currentListView: boolean): void {
    this.subjectToListView.next(currentListView);
  }

  /**
   * This function works along checkAuth function and handles the UI change (toggles) on Header compoenent displaying the tabs or not.
   * Call it in the constructor and subscribe to it.
   * @returns An angular observable that a components subscribes from its constructor
   */
  onCheckAuth(): Observable<any> {
    return this.subjectIsAuth.asObservable();
  }
  /**
   * This function works along onCheckAuth function and handles the UI change (toggles) on Header compoenent displaying the tabs or not.
   * It checks the local.storage (which we initiate after a Log In happens and clear after a Log out)
   * You can choose to check Authentiaction straight from the Auth restAPI instead of the localStorage (commented ones)
   * Fire that function when you want its coresponding observable to check for changes
   */
  checkAuth(): void {
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

  /**
   * This function works along checkAdmin function and handles the UI change (toggles) on Header compoenent displaying the Create Resource tab or not.
   * @returns An angular observable that a components subscribes from its constructor
   */
  onCheckAdmin(): Observable<any> {
    return this.subjectIsAdmin.asObservable();
  }
  /**
   * This function works along onCheckAdmin function and handles the UI change (toggles) on Header compoenent displaying the Create Resource tab or not.
   * It checks the local.storage (which we initiate after a Log In happens and clear after a Log out)
   * You can choose to check Authentiaction - admin role straight from the Auth restAPI instead of the localStorage (commented ones)
   * Fire that function when you want its coresponding observable to check for changes
   */
  checkAdmin(): void {
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
