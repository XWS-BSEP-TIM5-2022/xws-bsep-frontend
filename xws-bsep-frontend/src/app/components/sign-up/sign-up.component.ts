import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

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

  signUp(){
    var user = { 
      "name": "Kristina",
      "lastName": "Stojic",
      "email": "kris@gmail.com",
      "mobileNumber": "0653829384",
      "gender": "Male",
      "birthday": "1997-02-21T01:10:30Z",
      "username": "kris",
      "biography": "Vredan od malih nogu",
      "password" : "Kristina1234.",
      "isPublic": false,
      "education": [],
      "experience": [],
      "skills": [
          {
              "id": "624b0cc336a1d6fd8c4cf0f6",
              "name": "Java"
          }
      ],
      "interests": [
          {
              "id": "624b0cc336a1d6fd8c4cf0f6",
              "name": "Jasafasfadfva",
              "description": "lalalalala"
          }
      ],
      "role": "User"
  
  }

  this.authService.signUp(user).subscribe((posts: any) => {
    this.router.navigate(['']);

  })
  }

}
