import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
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
