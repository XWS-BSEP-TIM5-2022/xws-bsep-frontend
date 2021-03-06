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
  birth: any
  user = {
      "name": "",
      "lastName": "",
      "email": "",
      "mobileNumber": "",
      "gender": "",
      "birthday": "",
      "username": "",
      "biography": "",
      "password" : "",
      "role": ["User"],
      "education": [],
      "experience": [],
      "skills": [],
      "interests": []
  }


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
  
    console.log(this.user)

  //   var user = { 
  //     "name": "Kristina",
  //     "lastName": "Stojic",
  //     "email": "kris@gmail.com",
  //     "mobileNumber": "0653829384",
  //     "gender": "Male",
  //     "birthday": "1997-02-21T01:10:30Z",
  //     "username": "kris",
  //     "biography": "Vredan od malih nogu",
  //     "password" : "Kristina1234.",
  //     "isPublic": false,
  //     "education": [],
  //     "experience": [],
  //     "skills": [
  //         {
  //             "id": "624b0cc336a1d6fd8c4cf0f6",
  //             "name": "Java"
  //         }
  //     ],
  //     "interests": [
  //         {
  //             "id": "624b0cc336a1d6fd8c4cf0f6",
  //             "name": "Jasafasfadfva",
  //             "description": "lalalalala"
  //         }
  //     ],
  //     "role": "User"
  
  // }

  if(this.user.name === "" || this.user.lastName === "" || this.user.email === "" || this.user.username === "" || this.user.password === "" || this.user.gender === "" || this.user.birthday === ""){
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Enter required fields!',
    // })
    alert("Enter required fields!")
  }
  else{
    // this.user.birthday = this.user.birthday + "T00:00:00Z"
    
    console.log("rodj: " + this.user.birthday)
    this.authService.signUp(this.user).subscribe((posts: any) => {
      
      // Swal.fire({
      //   title: 'Please check your email',
      //   showClass: {
      //     popup: 'animate__animated animate__fadeInDown'
      //   },
      //   hideClass: {
      //     popup: 'animate__animated animate__fadeOutUp'
      //   }
      // })
      alert("Please check your email")
      this.router.navigate(['/login']);
    })
  }

  }


  selectGender($event){
    console.log($event.target.value)
    var gender = $event.target.value
    if(gender === 'Male'){
      this.user.gender = "Male"
    }else if(gender === 'Female'){
      this.user.gender = "Female"
    }

  }

  selectBirth(){
    this.user.birthday = this.birth + "T00:00:00Z"
  }

}
