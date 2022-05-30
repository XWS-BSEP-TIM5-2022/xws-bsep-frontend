import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { Interest } from 'src/app/model/interest';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-interests',
  templateUrl: './update-interests.component.html',
  styleUrls: ['./update-interests.component.scss']
})
export class UpdateInterestsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateInterestsComponent>, 
    private userService: UserService) { }

  user: User; 
  name : string = ""
  description : string = ""
  message : string = ""

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

  update(){

    this.name = this.name.trim()
    this.description = this.description.trim()

    if(this.name == ""){
      this.message = 'Interest name can not be empty!';
      return
    }
 

    var sanitize = require("mongo-sanitize");   
    var interest = new Interest;
    interest.name = sanitize(this.name) 
    if(this.description != ""){ 
      interest.description = sanitize(this.description)
    }
    this.user.interests.push(interest) 

    this.userService.update(this.user).subscribe(
      (success: SuccessMessage) => {
        console.log(success)
        if (success.success == "success"){
          Swal.fire({
            icon: 'success',
            title: 'Yay!',
            text: 'Interest successfully added!',
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
