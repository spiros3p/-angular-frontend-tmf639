import { Component, OnInit } from '@angular/core';
import { faBroadcastTower, faMapMarkedAlt, faHome, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { UiService } from '../../services/ui.service';

/** 
 * Displays the Header section of the view in the app
 * Contains the logic about displaying the tabs
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBroadcastTower = faBroadcastTower;
  faMapMarkedAlt = faMapMarkedAlt;
  faHome = faHome;
  faPlusCircle = faPlusCircle;
  faUser = faUser;
  /** Boolean used to display the tabs after the user is logged in */
  isAuthenticated!: boolean;
  /** Boolean used to display the Create Resource tab after the user is logged in and authorized with an admin role*/
  isAdmin!: boolean;

  subscriptionToIsAuthenticated!: Subscription;
  subscriptionToIsAdmin!: Subscription;

  /** Boolean used in interface changes (Mobile View) after clicking a tab to re collapse the menu */
  public isMenuCollapsed = true;

  constructor(
    private uiService: UiService
  ) {
    /** Subscribe to a UI Service that checks for user status and sets a boolean value to use for interface uses */
    this.subscriptionToIsAuthenticated =
      this.uiService
        .onCheckAuth()
        .subscribe(
          (value) => (this.isAuthenticated = value)
        )
    /** Subscribe to a UI Service that checks for admin status and sets a boolean value to use for interface uses */
    this.subscriptionToIsAdmin =
      this.uiService
        .onCheckAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  // maybe no need to call them here
  ngOnInit(): void {
    this.uiService.checkAuth();
    this.uiService.checkAdmin();
  }
}
