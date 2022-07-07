import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 
import { User } from 'src/app/model/user';
import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service'; 
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';
import { Conversation } from '../../model/conversation';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  user: User;     
  options: FormGroup;
  connectionControl = new FormControl();  
  newMessage : string = ""
  errorMessage : string = "" 
  connections : User[] = [];
  names : string[] = []

  constructor(fb: FormBuilder, 
    public dialogRef: MatDialogRef<NewMessageComponent>, 
    private userService: UserService,
    private messageService : MessageService,
    private connectionService : ConnectionService) {
    this.options = fb.group({
      connection: this.connectionControl
    });
  }
 
  
  ngOnInit(): void {
    this.connectionControl = new FormControl();
    this.getAllConnections() 
     
  }

  getAllConnections(){
    
    let userId =  localStorage.getItem("user");

    this.connectionService.getConnections().subscribe(
      (data: User[]) => { 
        this.getUsersFromConnection(data['users']); 
    }) 
  }

  getUsersFromConnection(data){ 

    for(let u of data){
      this.userService.getById(u.userID).subscribe((data: User) => { 
        this.connections.push(data['user'])
      })
    } 
  } 

  sendMessage(){ 

    if(!this.connectionControl.value){
      this.errorMessage = "Select who you want to send message."
      return
    }  

    if(!this.newMessage){
      this.errorMessage = "Message content can not be empty."
      return
    }  

    var sanitize = require("mongo-sanitize");  
    //this.editedUser.name = sanitize(this.user.name)
    
    var messageToSend = new Message;
    messageToSend.content = sanitize(this.newMessage.trim()) 
    messageToSend.receiver = this.connectionControl.value  

    this.messageService.newMessage(messageToSend).subscribe(
      (data: Conversation) => { 
        if (data){ 
          alert("Message sent!")
          this.dialogRef.close(data); 
        } else {  
          alert("Something went wrong. Please try again.")
        }
      })

  }

  cancel(){
    this.dialogRef.close();
  }
  
}
