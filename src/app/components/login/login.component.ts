import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.email) {
      this.alertifyService.warning("Please enter an email!")
      return
    }
    if (!this.password || this.password.length < 7) {
      this.alertifyService.warning("Password must be greater than 7 characters long")
      return
    }
    this.authService
      .login(this.email, this.password)
      .subscribe(
        response => {
          console.log("SUCCESFUL POST REQUEST: Response:", response)
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        },
        (error) => {
          if (typeof error.error.error === 'undefined') {
            this.alertifyService.error("ERROR: <br>" + error.error.message);
            console.error(error.error)
          } else {
            this.alertifyService.error("ERROR: <br>" + error.error.error.message)
            console.error("ERROR: " + error.error.error.message);
          }
        },
        () => {
          this.uiService.toggleAuth();
          this.router.navigate(['/']);
          console.debug("Succesful Log in!");
        }
      )
  }

}
