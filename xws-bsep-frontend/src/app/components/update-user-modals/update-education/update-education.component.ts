import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { Education } from 'src/app/model/education';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import Swal from 'sweetalert2'; 
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss']
})
export class UpdateEducationComponent implements OnInit { 

  constructor(fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEducationComponent>, 
    private userService: UserService) {     
      this.options = fb.group({
        gender: this.levelControl
      });
  }

  user: User;       
  message : string = ""  
  name = ""
  level = "Primary"
  place = ""
  start = ""
  end = ""
  options: FormGroup;
  levelControl  = new FormControl("Primary");  

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
 
  validate() : boolean{
    if(!this.name){
      this.message = "Company name can not be empty."
      return true
    } 

    if(!this.start){
      this.message = "Select start date"
      return true
    } 

    if(!this.end){
      this.message = "Select end date"
      return true
    }  

    if(!this.place){
      this.message = "Place of company can not be empty."
      return true
    }  

    return false
  }
 

  update(){

    if(this.validate()){
      return
    }
  
    var sanitize = require("mongo-sanitize");    
    
    var newEducation = new Education;
    newEducation.name = sanitize(this.name)
    newEducation.level = this.levelControl.value
    newEducation.place = sanitize(this.place)
    newEducation.startDate = this.start + "T00:00:00Z"
    newEducation.endDate = this.end + "T00:00:00Z"

    this.user.education.push(newEducation) 

    this.userService.update(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          Swal.fire({
            icon: 'success',
            title: 'Yay!',
            text: 'Education successfully added!',
          })    
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again.',
          })   
        }
      })
    this.dialogRef.close();

 
  }
 
  cancel(){
    this.dialogRef.close();
  }
}
