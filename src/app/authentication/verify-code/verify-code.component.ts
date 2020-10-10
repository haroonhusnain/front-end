import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Utils } from 'src/app/utils';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  verifyCode(f) {

    Utils.blockPage();
    this.authService.verifyCode(f.value).subscribe(data => {
      if (data.status) {
        swal('Successfull!', 'Your email is verified and success booked lugger!', 'success');
        this.authService.loginWithToken(data);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      Utils.showErrorMessage('Could not perform this action!', err);
    }, () => {
      Utils.unblockPage();
    });
  }

}
