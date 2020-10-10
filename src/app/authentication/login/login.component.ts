import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utils } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = '';
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * To login
   * @param loginForm => form as parameter
   */
  async login(loginForm: NgForm) {

    if (loginForm.valid) {
      this.authenticationService.login(loginForm.value).subscribe((data: any) => {

        if (data.token) {
          Utils.hideMagnigicPopup('#sign-in-dialog');
        }
      }, err => {
        this.error = 'Email or Password Incorrect !';
        console.log(err);

      });
    }
  }

}
