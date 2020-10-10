import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utils } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  constructor(private activatedRoute: ActivatedRoute , private authenticationService: AuthenticationService , private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.token = param.token;
    });
  }

  resetPassword(resetPasswordForm: NgForm) {
    const password = resetPasswordForm.value.password;
    const passwordConfirmation = resetPasswordForm.value.confirm_password;
    resetPasswordForm.value.token = this.token;


    if (password !== passwordConfirmation) {
      resetPasswordForm.controls.confirm_password.setErrors({ confirmation: true });
    }

    if (resetPasswordForm.valid) {
      Utils.blockPage();

      this.authenticationService.resetPassword(resetPasswordForm.value).subscribe((data: any) => {
        console.log(data);

        if (data.status) {
            swal('Success!', 'Password Reset Successfully!', 'success');
          } else {
            swal('Something Went Wrong!', 'Please Check your Email again', 'error');
          }

      } , err => {
        Utils.showErrorMessage('Something went wrong', err);
      } , () => {
        this.router.navigate(['/']);
        Utils.unblockPage();
      });

    }
  }

}
