import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-update-basic-info',
  templateUrl: './update-basic-info.component.html',
  styleUrls: ['./update-basic-info.component.scss']
})
export class UpdateBasicInfoComponent implements OnInit { 

  constructor(fb: FormBuilder, 
    public dialogRef: MatDialogRef<UpdateBasicInfoComponent>, 
    private userService: UserService) {
    this.options = fb.group({
      gender: this.genderControl
    });
  }

  user: User;     
  editedUser: User;   
  options: FormGroup;
  genderControl;  
  message : string = ""
  stringBirthday : any;
  finalBirthay : any = null;

  ngOnInit(): void {
    this.loadUserData(); 
  }

  loadUserData(){
    let userId =  localStorage.getItem("user");

    if (userId != undefined){
      this.userService.getById(userId).subscribe(
        (user: any) => {
        this.user = user['user']
        this.editedUser = user['user']    
        this.genderControl = new FormControl(this.user.gender);  
        const datepipe: DatePipe = new DatePipe('en-US')
        this.stringBirthday = datepipe.transform(this.user.birthday, 'dd-MMMM-YYYY') 
      })
    }
  }

  selectBirth(){
    this.finalBirthay = this.stringBirthday + "T00:00:00Z"
  }

  validate() : boolean{
    if(!this.user.email){
      this.message = "Email can not be empty."
      return true
    } 

    if(!this.user.name){
      this.message = "Name can not be empty."
      return true
    } 

    if(!this.user.lastName){
      this.message = "Last name can not be empty."
      return true
    } 

    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") 

    if(!pattern.test(this.user.email)){
      this.message = "Email is invalid."
      return true
    }

    return false
  }
 

  update(){

    if(this.validate()){
      return
    }
  
    var sanitize = require("mongo-sanitize");  
    this.editedUser.name = sanitize(this.user.name)
    this.editedUser.lastName = sanitize(this.user.lastName)
    this.editedUser.email = this.user.email
    this.editedUser.gender = this.user.gender

    if(this.finalBirthay == null || !this.finalBirthay){ 
      this.editedUser.birthday = this.user.birthday
    } else{
      this.editedUser.birthday = this.finalBirthay
    }
    
    this.editedUser.gender = this.genderControl.value

    this.userService.update(this.editedUser).subscribe(
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
    this.dialogRef.close();

  }
 
  cancel(){
    this.dialogRef.close();
  }
}
