import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  requestPassword(requestPasswordForm) {
    Utils.blockPage();
    try {
      if (requestPasswordForm.valid) {
        const body = requestPasswordForm.value;
        console.log(body);
        this.authenticationService.requestPassword(body).subscribe((data: any) => {
          if (data.status) {
            swal('Email Sent!', 'Please Check your Email!', 'success');
            Utils.hideMagnigicPopup('#sign-in-dialog');
          } else {
            swal('Ooopss!', 'User Not Found!', 'error');
          }
          console.log(data);
        } , err => {
          Utils.showErrorMessage('Something went wrong', err);
        } , () => {
          Utils.unblockPage();
        });
      }
    } catch (error) {
      Utils.showErrorMessage('Something went wrong', error);
    }
    Utils.unblockPage();
  }

}
