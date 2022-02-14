import { Component, OnInit } from '@angular/core';
import { faBroadcastTower, faMapMarkedAlt, faHome, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { UiService } from '../../services/ui.service';

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
  isAuthenticated!: boolean;
  isAdmin!: boolean;

  subscriptionToIsAuthenticated!: Subscription;
  subscriptionToIsAdmin!: Subscription;

  public isMenuCollapsed = true;

  constructor(
    private uiService: UiService
  ) {
    this.subscriptionToIsAuthenticated =
      this.uiService
        .onToggleAuth()
        .subscribe(
          (value) => (this.isAuthenticated = value)
        )
    this.subscriptionToIsAdmin =
      this.uiService
        .onToggleAdmin()
        .subscribe(
          (value) => (this.isAdmin = value)
        )
  }

  // maybe no need to call them here
  ngOnInit(): void {
    this.uiService.toggleAuth();
    this.uiService.toggleAdmin();
  }
}
