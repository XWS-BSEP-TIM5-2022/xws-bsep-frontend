import { SuccessMessage } from './../../model/success-message';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/model/notification';

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
      private _snackBar: MatSnackBar,
      private connectionService: ConnectionService, 
      private router: Router,
      private notificationService: NotificationService) { }
      
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
  requestTab = false;
  changePassTab = true;
  accSetignsTab = false;
  privacyTab = false;
  notificationTab = false;
  users: User[]  = []
  allNotifications: Notification[] = []

  ngOnInit(): void {
    this.loadUserData();
    this.getAllRequests();
    this.loadNotifications();
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");
    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        console.log(this.user)

        })
      }

      console.log(this.user)


    }

    changePrivacy(){
      if(this.user.isPublic){
        console.log("mijenja u private")
        var dto= {
          "private": false
        }
        this.connectionService.changePrivacy(dto).subscribe(
          (user: any) => {
            window.location.reload()  
          })


        this.user.isPublic = false


        this.userService.updatePrivacy(this.user).subscribe(
          (success: SuccessMessage) => {
            console.log(success)
            if (success.success == "success"){
              // Swal.fire({
              //   icon: 'success',
              //   title: 'Yay!',
              //   text: 'Informations successfully changed!',
              // })
              alert("Informations successfully changed!")    
            } else {
              // Swal.fire({
              //   icon: 'error',
              //   title: 'Oops...',
              //   text: 'Something went wrong. Please try again.',
              // }) 
              alert("Something went wrong. Please try again.")  
            }
          })
        
      }
      else {
        console.log("mijenja u public")
        var dto= {
          "private": true
        }
        this.connectionService.changePrivacy(dto).subscribe(
          (user: any) => {
            window.location.reload()  
          })


        
          this.user.isPublic = true

          this.userService.updatePrivacy(this.user).subscribe(
            (success: SuccessMessage) => {
              console.log(success)
              if (success.success == "success"){
                // Swal.fire({
                //   icon: 'success',
                //   title: 'Yay!',
                //   text: 'Informations successfully changed!',
                // })
                alert("Informations successfully changed!")    
              } else {
                // Swal.fire({
                //   icon: 'error',
                //   title: 'Oops...',
                //   text: 'Something went wrong. Please try again.',
                // }) 
                alert("Something went wrong. Please try again.")  
              }
            })

        }



      }
    

    getAllRequests(){
      let userId =  localStorage.getItem("user");

      this.connectionService.getAllRequests(userId).subscribe(
        (data: User[]) => {
          this.users = data['users']
          this.getUsersFromRequest(this.users);
      })

    }

    getUsersFromRequest(data){
      this.users = []

      for(let u of data){
        this.userService.getById(u.userID).subscribe((data: User) => {
          this.users.push(data['user'])
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


  requests(){
    this.requestTab = true;
    this.changePassTab = false;
    this.accSetignsTab = false;
    this.privacyTab = false;
    this.notificationTab = false;

    console.log(this.privacyTab)
  }

  accSetings(){
    this.requestTab = false;
    this.changePassTab = false;
    this.accSetignsTab = true;
    this.privacyTab = false;
    this.notificationTab = false;

  }

  privacy(){
    this.requestTab = false;
    this.changePassTab = false;
    this.accSetignsTab = false;
    this.privacyTab = true;
    console.log(this.privacyTab)
    this.notificationTab = false;


    
  }

  notifications(){
    this.requestTab = false;
    this.changePassTab = false;
    this.accSetignsTab = false;
    this.privacyTab = false;
    this.notificationTab = true;

  }

  changePass(){
    this.changePassTab = true;
    this.requestTab = false;
    this.accSetignsTab = false;
    this.privacyTab = false;
    this.notificationTab = false;
    console.log(this.requestTab)
  }

  acceptRequest(id){
    console.log("odobravam")
    var dto = {
      "userID": id
    }

    this.connectionService.approveRequest(dto).subscribe((res: any) => {
      window.location.reload()
    })
  }

  rejectRequest(id){
    console.log("odbijam")
    var dto = {
      "userID": id
    }

    this.connectionService.rejectRequest(dto).subscribe((res: any) => {
      window.location.reload()
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

  turnOnPostNotifications(){
    this.user.postNotification = true; 
    console.log(this.user)
    this.userService.updatePostNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  turnOffPostNotifications(){
    this.user.postNotification = false;
    this.userService.updatePostNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  turnOffMessageNotifications(){
    this.user.messageNotification = false;
    this.userService.updateMessageNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  turnOnMessageNotifications(){
    this.user.messageNotification = true; 
    this.userService.updateMessageNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  turnOffFollowNotifications(){
    this.user.followNotification = false; 
    this.userService.updateFollowNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  turnOnFollowNotifications(){
    this.user.followNotification = true; 
    this.userService.updateFollowNotification(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          alert("Successfully updated!")    
        } else {
          alert("Something went wrong. Please try again.")
        }
      }) 
  }

  loadNotifications(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.notificationService.getByUserId(userId).subscribe(
        (data: Notification[]) => {
          this.allNotifications = data
          console.log(data)
      })
    }
  }
}
