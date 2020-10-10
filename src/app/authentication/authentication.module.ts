import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogComponent } from './authentication-dialog/authentication-dialog.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';


@NgModule({
  declarations: [
    AuthenticationDialogComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyCodeComponent
  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AuthenticationDialogComponent
  ]
})
export class AuthenticationModule { }
