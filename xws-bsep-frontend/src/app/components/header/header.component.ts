import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }
  visibleUserAcccountSettings: boolean = false;
  user: any
  ngOnInit(): void {
    this.user = localStorage.getItem("loggedUserName")
  }

  makeVisibleUserAcccountSettings() {
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

}
