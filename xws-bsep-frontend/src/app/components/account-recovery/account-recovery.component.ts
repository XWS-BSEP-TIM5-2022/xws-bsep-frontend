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
  isHiddenDivResendCode: boolean = true;

  email: string = "";
  code: string = "";
  password: string = "";
  reenteredPassword: string = "";
  authId: string = "";

  ngOnInit(): void {
  }

  sendEmail() {
    // TODO SD: validacija email
    const body = {
      "email": this.email
    }
    this.authService.sendRecoveryCode(body).subscribe(res => {
      this.authId = res["idAuth"]
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = false;
      this.isHiddenDivChangePass = true;
      alert('Verification code is sent! Check your mail inbox!')
    }, err => {
      alert("Invalid email")
    })
  }

  sendCode() {
    // TODO SD: validacija front
    const body = {
      "idAuth": this.authId,
      "verificationCode": this.code.toString(),
      "email": this.email
    }
    this.authService.VerifyRecoveryCode(body).subscribe(res => {
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = true;
      this.isHiddenDivChangePass = false;
    }, err => {
      console.log(err)
      alert(err.error.message)
    })
  }

  resetPassword() {
    const body = {
      "idAuth": this.authId,
      "password": this.password,
      "reenteredPassword": this.reenteredPassword
    }
    this.authService.ResetForgottenPassword(body).subscribe(res => {
      alert('New password successfully set')
      this.router.navigate(['/']);
    }, err => {
      console.log(err)
      alert(err.error.message)
    })
   
  }

}
