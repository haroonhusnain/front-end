import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utils } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error = '';
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Sign up form
   * @param signupForm => form as parameter
   */
  async createLugger(luggerForm) {

    const password = luggerForm.value.password;
    const passwordConfirmation = luggerForm.value.confirm_password;

    if (password !== passwordConfirmation) {
      luggerForm.controls.confirm_password.setErrors({ confirmation: true });
    }

    if (luggerForm.valid) {

      Utils.blockPage();

      // try {

      //   const body = luggerForm.value;
      //   const res = await this.authenticationService.signup(body);
      //   console.log(res);

      // } catch (error) {
      //   console.log(error);
      // }

      const body = luggerForm.value;
      body.type = 'lugger';
      this.authenticationService.signup(body).subscribe(data => {

        if (data) {
          console.log(data);
        } else {
          console.log(data);
        }

      }, err => {
        this.error = 'Email Already Exist';

        Utils.showErrorMessage('Something went wrong', err);
        Utils.unblockPage();
      }, () => {

        Utils.unblockPage();
      });

    }




  }

}
