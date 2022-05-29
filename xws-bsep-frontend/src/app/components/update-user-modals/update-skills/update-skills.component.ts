import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  
import { User } from 'src/app/model/user';
import { Skill } from 'src/app/model/skill';
import { UserService } from 'src/app/services/user.service';
import { SuccessMessage } from 'src/app/model/success-message';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-skills',
  templateUrl: './update-skills.component.html',
  styleUrls: ['./update-skills.component.scss']
})
export class UpdateSkillsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateSkillsComponent>, 
    private userService: UserService) { }

  user: User; 
  newSkill : string = ""
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

    var sanitize = require("mongo-sanitize");   
    var newSkill = new Skill;
    newSkill.name = sanitize(this.newSkill) 
    this.user.skills.push(newSkill)

    if (this.user.biography != undefined && this.user.biography != "" && this.user.biography.trim() != ""){

      this.userService.update(this.user).subscribe(
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
      this.message = 'Skill name can not be empty!';
    }
 
  }
 
  cancel(){
    this.dialogRef.close();
  }
}
