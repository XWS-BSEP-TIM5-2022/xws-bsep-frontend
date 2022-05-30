import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { Experience } from 'src/app/model/experience';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import Swal from 'sweetalert2';  
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.scss']
})
export class UpdateExperienceComponent implements OnInit { 

  constructor( 
    public dialogRef: MatDialogRef<UpdateExperienceComponent>, 
    private userService: UserService) { }

  user: User;       
  message : string = ""  
  name = ""
  headline = ""
  place = ""
  start = ""
  end = "" 
  maxDate :any;

  ngOnInit(): void {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.maxDate = datepipe.transform(new Date(), 'YYYY-MM-dd') 
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

    if(!this.headline){
      this.message = "Headline can not be empty."
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
    
    var newExperience = new Experience;
    newExperience.name = sanitize(this.name)
    newExperience.headline = sanitize(this.headline)
    newExperience.place = sanitize(this.place)
    newExperience.startDate = this.start + "T00:00:00Z"
    newExperience.endDate = this.end + "T00:00:00Z"

    this.user.experience.push(newExperience) 

    this.userService.update(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          Swal.fire({
            icon: 'success',
            title: 'Yay!',
            text: 'Experience successfully added!',
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
