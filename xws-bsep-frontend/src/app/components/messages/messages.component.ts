import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Conversation } from '../../model/conversation';
import { User } from '../../model/user'; 
import { Message } from '../../model/message'; 
import { MessageService } from '../../services/message.service'; 
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewMessageComponent } from '../new-message/new-message.component'; 
import { DatePipe } from '@angular/common'; 
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Event } from '../../model/event';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  conversations : Conversation[] = []
  openedConversation! : Conversation;
  connections : User[] = []; 
  userId =  localStorage.getItem("user");
  newMess = "";

  constructor(
    private messageService: MessageService,
    private userService : UserService, 
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,) { }

    
  ngOnInit(): void {
    this.loadConversations()  
    this.scrollToBottom(); 
  }
  
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    this.cdr.detectChanges();
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
          this.cdr.detectChanges();

      } catch(err) { }                 
  }

  loadConversations(){ 
    
    if (this.userId != undefined){
      this.messageService.getAllConversationsForUser().subscribe(
        (conversations: Conversation[]) => {
          
        var allConversations = conversations['conversations'] 
        this.getParticipants(conversations['conversations']) 
      })
    }
  }
  
  getParticipants(data){  
    this.conversations = [] 

    for(let u of data){

      var participantId = u.user1
      if(this.userId == u.user1){ 
        participantId = u.user2
      }
      
      this.userService.getById(participantId).subscribe((data: User) => { 
        
        var user = data['user']
        u.participant = user.name + " " + user.lastName
        this.conversations.push(u)
      })
    } 
  } 

  loadUser(id){
    this.userService.getById(id).subscribe(
      (user: any) => {
      var user = user['user']
      var name = user.name + ' ' + user.lastName
      return name
    })
  }

  newMessage(){
    const dialogRef = this.dialog.open(NewMessageComponent, {
      width: '40vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result : Conversation) => {  
      // window.location.reload()
 
      this.openedConversation = result['conversation']

      this.getName()
 
    }); 
  }

  getName(){
    var participantId = this.openedConversation.user1
    if(this.userId == this.openedConversation.user1){ 
      participantId = this.openedConversation.user2
    }
    
    this.userService.getById(participantId).subscribe((data: User) => { 
      
      var user = data['user']
      this.openedConversation.participant = user.name + " " + user.lastName 
    })

    this.loadConversations()
  }

  formatDate(date){
    
    const datepipe: DatePipe = new DatePipe('en-US')
    return datepipe.transform(date, 'dd-MMMM-YYYY HH:mm:ss')
  }

  sendMessage(){ 

    if(!this.openedConversation){ 
      return
    }  

    if(!this.newMess){
      alert("Message content can not be empty.")
      return
    }  

    var sanitize = require("mongo-sanitize");   
    
    var messageToSend = new Message;
    messageToSend.content = sanitize(this.newMess.trim()) 

    var participantId = this.openedConversation.user1
    if(this.userId == this.openedConversation.user1){ 
      participantId = this.openedConversation.user2
    } 
    messageToSend.receiver = participantId
    this.newMess = ""
    this.messageService.newMessage(messageToSend).subscribe(
      (data: Conversation) => { 
        if (data){  
          this.openedConversation = data['conversation'] 
          this.getName()
          
        } else {  
          alert("Something went wrong. Please try again.")
        }
      })

  }
}
