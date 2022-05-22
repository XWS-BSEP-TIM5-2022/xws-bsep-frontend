import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
      private authService: AuthService, 
      private formBuilder: FormBuilder,
      private userService: UserService) { }
      
  user: User;
  oldPassword: string = "";
  newPassword: string = "";
  newReenteredPassword: string = "";
  visibleUserAcccountSettings: boolean = false;

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
    // TODO SD: validacija na frontu
    const body = {
      oldPassword: "",
      newPassword: this.newPassword,
      newReenteredPassword: this.newReenteredPassword
    }
    this.authService.changePassword(body).subscribe(res => {
      console.log(res)
      alert(res["message"])

    }, err => {
      console.log(err)
      alert(err.error.message)
    })
  }

  makeVisibleUserAcccountSettings() {
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }
}
