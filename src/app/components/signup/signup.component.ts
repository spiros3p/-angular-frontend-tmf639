import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

/**
 * It is the component used in the signup route
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  /** Boolean variable that is used to display a new div in the component after a successful Signup request */
  showAfterSignUp: boolean = false;
  /** Boolean variable that is used to toggle the type of the password between 'text' and 'password' when the user clicks the eye icon */
  showpassword: boolean = false;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  /** Function that is called when the eye icon in the password box is clicked */
  togglepassword(): void {
    this.showpassword = !this.showpassword;
  }

  /** calls the authService.signup method and passes the form values as its parameter */
  signup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe(
        (response) => {
          console.debug("SUCCESFUL POST REQUEST: Message:", response.message);
        },
        errors => {
          if (typeof errors.error.errors === 'undefined') {
            this.alertifyService.error("ERROR: " + errors.error)
            console.error(errors.error)
          } else {
            this.alertifyService.error("ERROR: " + errors.error.errors.param + "<br>" + errors.error.errors.msg)
            console.error("ERROR: " + errors.error.errors.param + " : " + errors.error.errors.msg);
          }
        },
        () => {
          this.alertifyService.success("New User registered succesfully!")
          console.debug("New User Created!");
          this.showAfterSignUp = true;
        }
      )
  }
}
