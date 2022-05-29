import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-biography',
  templateUrl: './update-biography.component.html',
  styleUrls: ['./update-biography.component.scss']
})
export class UpdateBiographyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateBiographyComponent>, 
    private userService: UserService) { }

  user: User; 
  newBiography : string = ""

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

    var sanitize = require("mongo-sanitize");  
    this.user.biography = sanitize(this.newBiography)  

    if (this.user.biography != undefined && this.user.biography != "" && this.user.biography.trim() != ""){

      this.userService.updateBasicInfo(this.user).subscribe(
        (success: SuccessMessage) => {
          console.log(success)
          if (success.success == "success"){
            Swal.fire({
              icon: 'success',
              title: 'Yay!',
              text: 'Biography successfully changed!',
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Biography can not be empty!',
      })  
    }
 
  }
 
  cancel(){
    this.dialogRef.close();
  }
}
