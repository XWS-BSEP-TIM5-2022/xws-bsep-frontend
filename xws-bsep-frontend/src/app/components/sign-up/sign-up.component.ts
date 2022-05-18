import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  skills : any[] = [];  
  interests : any[] = [];  
  education : any[] = [];  

  addSkill() {
    this.skills.push(this.skills.length);
    }

  addInterests(){
    this.interests.push(this.interests.length);
  }

  addEducation(){
    this.education.push(this.education.length);
  }

}
