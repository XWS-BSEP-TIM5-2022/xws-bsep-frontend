import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/event';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
 
  constructor( 
    private router: Router, 
    private authService: AuthService,
    private eventService : EventService) { }

  events : Event[] = [];

  ngOnInit(): void {
    this.loadEvents()
  }

  loadEvents(){

    this.eventService.getAllMessageEvents().subscribe(
      (events: Event[]) => { 
        this.events = events['events']
    })
  }

  formatDate(date){
    
    const datepipe: DatePipe = new DatePipe('en-US')
    return datepipe.transform(date, 'dd-MMMM-YYYY HH:mm:ss')
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

}
