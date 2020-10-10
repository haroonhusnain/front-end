import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.css']
})
export class AuthenticationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    Utils.hideMagnigicPopup('#sign-in-dialog');
  }
}
