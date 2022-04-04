import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UiService } from 'src/app/services/ui.service';

import { User } from 'src/app/models/User';

/**
 * Displays the Account tab Page and contains its logic
 */
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  users: User[] = [];
  /** Boolean used to control interface according to admin status */
  isAdmin: boolean = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private uiService: UiService
  ) { }

  /** On init checks from local storage about admin status and calls admin servie to get the user list (server protected request) */
  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("currentUser") || '{}').admin == 1) {
      this.isAdmin = true;
      this.adminService
        .getUsers()
        .subscribe(
          (users) => {
            this.users = users;
          }
        )
    }
  }

  /**
   * Method that calls the admin service to send patch request and change the 'accepted' status of the selected user
   * @param {user} user user object
   */
  toToggleUser(user: User) {
    this.adminService
      .toggleUserAccepted(user.id, !user.accepted)
      .subscribe(
        (val) => {
          console.log("PATCH call successful value returned in body", val.name);
        },
        response => {
          this.alertifyService.error("ERROR:<br>" + response)
          console.debug("PACTH call in error", response);
        },
        () => {
          if (user.accepted) {
            user.accepted = 0;
          } else {
            user.accepted = 1;
          }
          this.alertifyService.success("SUCCESFULY TOGGLED:<br>USER: " + user.name);
        }
      )
  }

    /**
   * Method that calls the admin service to send delete request for the selected user
   * @param {user} user user object
   */
  toDeleteUser(user: User) {
    console.log(user);
    this.adminService
      .deleteUser(user)
      .subscribe(
        (val) => {
          console.log("DELETE call successful value returned in body", val);
        },
        response => {
          this.alertifyService.error("ERROR:<br>" + response)
          console.debug("DELETE call in error", response);
        },
        () => {
          this.users = this.users.filter(t => t.id !== user.id)
          this.alertifyService.success("SUCCESFULY DELETED:<br>USER: " + user.name);
        }
      )
  }

  /** Method that logs out the user from the app and the session */
  logout(): void {
    this.authService
      .logout()
      .subscribe(
        (response) => {
          console.debug("SUCCESFUL POST REQUEST: Message:", response.message);
          localStorage.removeItem("currentUser");
        },
        errors => {
          if (typeof errors.error.errors === 'undefined') {
            console.error(errors.error)
            if (errors.error.message == 'not authenticated') {
              this.router.navigate(['/login']);
            }
          } else {
            console.error("ERROR: " + errors.error.errors.param + " : " + errors.error.errors.msg);
          }
        },
        () => {
          console.debug("Succesfully Logged Out!");
          this.router.navigate(['/login']);
          this.uiService.checkAuth();
        }
      )
  }

}
