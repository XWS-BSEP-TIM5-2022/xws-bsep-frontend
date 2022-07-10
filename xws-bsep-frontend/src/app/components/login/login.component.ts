import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { } 

  username: string = ""
  password: string = ""
  email: string = ""
  isPassless = false;
  isLogin = true;
  isSignup = false;
  message = "";
  messageLogin = "";
  messageSignUp = "";
  isSubmitted = false; 
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
      "isPublic": false,
      "role": ["User"],
      "education": [],
      "experience": [],
      "skills": [],
      "interests": []
  }
  ngOnInit(): void {}

  login(){ 

    if(this.validateLogin()){
      return
    }

    var user = {
      username : this.username,
      password : this.password
    }

    console.log(user.username)
    this.authService.login(user).subscribe((posts: any) => {
      var role = localStorage.getItem('role')
      if(role === 'Admin'){
        this.router.navigate(['/admin-events']); 
      }else{
        this.router.navigate(['/feed']); 
      }
    })

  }

  validateLogin() : boolean{
    this.username = this.username.trim()
    this.password = this.password.trim()

    if(!this.username){
      this.messageLogin = "Write your username."
      return true
    }

    if (/\s/.test(this.username)) {
      this.messageLogin = "Username cannot contain whitespace."
      return true
    }

    if(!this.password){
      this.messageLogin = "Write your password."
      return true
    }

    if (/\s/.test(this.password)) {
      this.messageLogin = "Password cannot contain whitespace."
      return true
    }

    if(this.password == this.username){
      this.messageLogin = "Password cannot be the same as username!"
      return true
    }

    let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?:;<>=`~\\]\x22\x27\(\)\{\}\|\/\[\\\\?]).{8,}$')

    if(!pattern.test(this.password)){
      this.messageLogin = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      return true
    }
    this.messageLogin = ""

    return false
  }

  onEmailChange(){
    this.message = ""
  }

  passwordlessLogin(){

    this.email = this.email.trim()

    if(this.validatePasswordlessLogin()){
      return
    }

    this.authService.passwordlessLogin({"email" : this.email}).subscribe((data) => {
      this.isSubmitted = true; 
    }, err => {
      console.log(err)
      this.message = "There is no acctivated acount with this email."
    }) 
  }
  
  validatePasswordlessLogin() : boolean{
    if(!this.email){
      this.message = "Write your email."
      return true
    } 

    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") 

    if(!pattern.test(this.email)){
      this.message = "Email is invalid."
      return true
    }

    return false
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

  signUp(){

    if(this.validateSignUp()){
      return
    }

      console.log(this.user)
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

        window.location.reload()
      })
    
  
  }

  validateSignUp() : boolean{
    this.user.name = this.user.name.trim()
    this.user.lastName = this.user.lastName.trim()
    this.user.email = this.user.email.trim()
    this.user.gender = this.user.gender.trim()
    this.user.password = this.user.password.trim()
    this.user.username = this.user.username.trim()
    // provjeri:
    // this.user.biography = this.user.biography.trim()
    // this.user.mobileNumber = this.user.mobileNumber.trim()

    if(!this.user.name){
      this.messageSignUp = "Write your name."
      return true
    }

    if(!this.user.lastName){
      this.messageSignUp = "Write your lastname."
      return true
    }

    if(!this.user.email){
      this.messageSignUp = "Write your email."
      return true
    }

    let patternEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") 

    if(!patternEmail.test(this.user.email)){
      this.messageSignUp = "Email is invalid."
      return true
    }

    if(!this.user.username){
      this.messageSignUp = "Write your username."
      return true
    }

    if (/\s/.test(this.user.username)) {
      this.messageLogin = "Username cannot contain whitespace."
      return true
    }

    if(!this.user.gender){
      this.messageSignUp = "Select your gender."
      return true
    }

    if(!this.user.birthday){
      this.messageSignUp = "Select your birthday."
      return true
    }

    if(!this.user.password){
      this.messageSignUp = "Write your password."
      return true
    }

    if (/\s/.test(this.user.password)) {
      this.messageSignUp = "Password cannot contain whitespace."
      return true
    }

    if(this.user.password == this.user.username){
      this.messageSignUp = "Password cannot be the same as username!"
      return true
    }

    let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

    if(!pattern.test(this.user.password)){
      this.messageSignUp = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      return true
    }
    this.messageSignUp = ""


    return false
  }

}
