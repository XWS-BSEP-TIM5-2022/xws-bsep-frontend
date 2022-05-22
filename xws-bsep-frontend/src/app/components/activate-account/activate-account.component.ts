import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  token: any

  ngOnInit(): void {
    var url = window.location.href;
    this.token = url.split("/")[4]
    this.authService.activateAccount(this.token).subscribe(
      (token: any) => {
      console.log(token)
    })
  }

  login(){
    this.router.navigate(['']);

  }

}
