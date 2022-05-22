import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.scss']
})
export class PasswordlessLoginComponent implements OnInit {

  constructor(private router: Router, private route : ActivatedRoute, private authService : AuthService) { } 
 
  jwt: string = "";
  message : string = ""
  showButton = false;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.jwt = params['jwt']; 
    }); 

    this.authService.confirmedPasswordlessLogin(this.jwt).subscribe((data) => {
      this.message = "You are now successfully signed in!"
      this.showButton = true;
    }, err => {
      console.log(err)
      this.message = err.error.message
    }) 
 
  }
 
  homePage(){ 

  sendCode() {
    // TODO SD: validacija front
    const body = {
      "idAuth": this.authId,
      "verificationCode": this.code.toString(),
      "email": this.email
    }
    this.authService.verifyRecoveryCode(body).subscribe(res => {
      this.isHiddenDivEmail = true;
      this.isHiddenDivCode = true;
      this.isHiddenDivChangePass = false;
    }, err => {
      console.log(err)
      alert(err.error.message)
    })
  }

  resetPassword() {
    const body = {
      "idAuth": this.authId,
      "password": this.password,
      "reenteredPassword": this.reenteredPassword
    }
    this.authService.resetForgottenPassword(body).subscribe(res => {
      alert('New password successfully set')
      this.router.navigate(['/']);
    }, err => {
      console.log(err)
      alert(err.error.message)
    })
   
    this.router.navigate(['/feed']); 
  }

  tryAgain(){
    this.router.navigate(['/'])
  }

}
