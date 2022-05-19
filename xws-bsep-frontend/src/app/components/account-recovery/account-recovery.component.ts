import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  isHiddenDivEmail: boolean = false;
  isHiddenDivCode: boolean = true;
  isHiddenDivChangePass : boolean = true;

  email: string = "";
  code: string = "";
  password: string = "";
  reenteredPassword: string = "";
  authId: string = "";

  ngOnInit(): void {
  }

  sendEmail() {
    this.authService.sendRecoveryCode(this.email).subscribe(res => {
      this.authId = res["idAuth"]
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = false;
      this.isHiddenDivChangePass = true;
    })
  }

  sendCode() {
    this.isHiddenDivEmail = true;
    this.isHiddenDivCode = true;
    this.isHiddenDivChangePass = false;
  }

  resetPassword() {
    this.router.navigate(['/']);
  }

}
