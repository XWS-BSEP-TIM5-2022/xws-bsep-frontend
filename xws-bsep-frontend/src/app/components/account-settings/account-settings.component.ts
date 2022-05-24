import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
      private authService: AuthService, 
      private formBuilder: FormBuilder,
      private userService: UserService,
      private _snackBar: MatSnackBar) { }
      
  user: User;
  oldPassword: string = "";
  newPassword: string = "";
  newReenteredPassword: string = "";
  visibleUserAcccountSettings: boolean = false;

  hiddenPassword1: boolean = true;
  inputType1: string = "password";
  hiddenPassword2: boolean = true;
  inputType2: string = "password";
  hiddenPassword3: boolean = true;
  inputType3: string = "password";

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");
    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        })
      }
    }

  changePassword(){
    if(this.changePasswordCriteria()) {
      return;
    }
    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      newReenteredPassword: this.newReenteredPassword
    }
    this.authService.changePassword(body).subscribe(res => {
      console.log(res);
      this.openSnackBar("Password is updated!", "Close")
      this.oldPassword = "";
      this.newPassword = "";
      this.newReenteredPassword = "";
    }, err => {
      console.log(err);
      this.openSnackBar(err.error.message, "Ok");
    })
  }

  makeVisibleUserAcccountSettings() {
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  changePasswordCriteria() {
    if(!this.oldPassword || !this.newPassword || !this.newReenteredPassword){
      this.openSnackBar("All fields are mandatory", "Ok")
      return true;
    }
    if(!this.isValid(this.oldPassword)){
      return true;
    }
    if(!this.isValid(this.newPassword)) {
      return true;
    }
    if(this.newReenteredPassword != this.newPassword) {
      this.openSnackBar("Passwords do not match", "Ok")
      return true;
    }
    return false;
  }

  isValid(password: string) {
    let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?:;<>=`~\\]\x22\x27\(\)\{\}\|\/\[\\\\?]).{8,}$')

    if(!pattern.test(password)){
      let message = "Password must contain minimum 8 characters,"+
      " at least one uppercase letter, one lowercase letter, one number and one special character.";
      this.openSnackBar(message, "Ok");
      return false;
    }
    return true;
  }

  makeOldPasswordVisible() {
    this.hiddenPassword1 = !this.hiddenPassword1;
    if(this.hiddenPassword1) {
      this.inputType1 = "password";
    } else {
      this.inputType1 = "text";
    }
  }

  makeNewPasswordVisible() {
    this.hiddenPassword2 = !this.hiddenPassword2;
    if(this.hiddenPassword2) {
      this.inputType2 = "password";
    } else {
      this.inputType2 = "text";
    }
  }

  makeNewReenteredPasswordVisible() {
    this.hiddenPassword3 = !this.hiddenPassword3;
    if(this.hiddenPassword3) {
      this.inputType3 = "password";
    } else {
      this.inputType3 = "text";
    }
  }
}
