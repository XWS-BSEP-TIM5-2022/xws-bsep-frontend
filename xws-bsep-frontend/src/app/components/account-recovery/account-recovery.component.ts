import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.scss']
})
export class AccountRecoveryComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  isHiddenDivEmail: boolean = false;
  isHiddenDivCode: boolean = true;
  isHiddenDivChangePass : boolean = true;
  isHiddenDivResendCode: boolean = true;

  email: string = "";
  code: string = "";
  password: string = "";
  reenteredPassword: string = "";
  authId: string = "";

  hiddenPassword1: boolean = true;
  inputType1: string = "password";
  hiddenPassword2: boolean = true;
  inputType2: string = "password";

  countOfCodeNumbers = 6;

  ngOnInit(): void {
  }

  sendEmail() {
    if (this.email == ""){
      this._snackBar.open("Email is required", "Ok");
      return;
    }
    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    if(!pattern.test(this.email)){
      let msg = "You have entered an invalid email address";
      this._snackBar.open(msg, "Ok");
      return;
    }
    const body = {
      "email": this.email
    }
    this.authService.sendRecoveryCode(body).subscribe(res => {
      this.authId = res["idAuth"]
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = false;
      this.isHiddenDivChangePass = true;
      this._snackBar.open('Verification code is sent! Check your mail inbox!', "Ok")

    }, err => {
      this._snackBar.open("There is no user with the entered email", "Ok")
    })
  }

  sendCode() {
    // alert()
    if(!this.code) {
      this._snackBar.open("Code is required", "Ok")
      return;
    }
    if (this.code.toString().length != 6) {
      this._snackBar.open("Code contains exactly "+ this.countOfCodeNumbers +" digits", "Ok")
      return;
    }
    const body = {
      "idAuth": this.authId,
      "verificationCode": this.code.toString(),
      "email": this.email
    }
    this.authService.verifyRecoveryCode(body).subscribe(res => {
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = true;
      this.isHiddenDivChangePass = false;
    }, err => {
      console.log(err)
      this._snackBar.open(err.error.message, "Ok")
    })
  }

  resetPassword() {
    if(this.changePasswordCriteria()) {
      return;
    }
    const body = {
      "idAuth": this.authId,
      "password": this.password,
      "reenteredPassword": this.reenteredPassword
    }
    this.authService.resetForgottenPassword(body).subscribe(res => {
      this._snackBar.open('New password successfully set', "Ok")
      this.router.navigate(['/']);
    }, err => {
      console.log(err)
      this._snackBar.open(err.error.message, "Ok")
    })
  }

  changePasswordCriteria() {
    if(!this.password || !this.reenteredPassword){
      this._snackBar.open("All fields are mandatory", "Ok")
      return true;
    }
    if(!this.isValid(this.password)){
      return true;
    }
    if(!this.isValid(this.reenteredPassword)) {
      return true;
    }
    if(this.password != this.reenteredPassword) {
      this._snackBar.open("Passwords do not match", "Ok")
      return true;
    }
    return false;
  }

  isValid(password: string) {
    let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?:;<>=`~\\]\x22\x27\(\)\{\}\|\/\[\\\\?]).{8,}$')
    if(!pattern.test(password)){
      let message = "Password must contain minimum 8 characters,"+
      " at least one uppercase letter, one lowercase letter, one number and one special character.";
      this._snackBar.open(message, "Ok");
      return false;
    }
    return true;
  }

  makeNewPasswordVisible() {
    this.hiddenPassword1 = !this.hiddenPassword1;
    if(this.hiddenPassword1) {
      this.inputType1 = "password";
    } else {
      this.inputType1 = "text";
    }
  }

  makeNewReenteredPasswordVisible() {
    this.hiddenPassword2 = !this.hiddenPassword2;
    if(this.hiddenPassword2) {
      this.inputType2 = "password";
    } else {
      this.inputType2 = "text";
    }
  }


}

