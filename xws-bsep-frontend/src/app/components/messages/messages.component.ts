import { Component, OnInit } from '@angular/core';
import { Conversation } from '../../model/conversation';
import { User } from '../../model/user';
import { ConnectionService } from '../../services/connection.service';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  conversations : Conversation[] = []
  openedConversation! : Conversation;
  connections : User[] = [];

  constructor(
    private messageService: MessageService,
    private userService : UserService,
    private connectionService : ConnectionService) { }

  ngOnInit(): void {
    this.loadConversations()
    this.loadConnections()
  }
  
  loadConnections(){  

      this.messageService.getAllConversationsForUser().subscribe(
        (data: any) => { 
        this.connections = data['users']  
        console.dir(this.connections)
      }) 
  }

  loadConversations(){
    let userId =  localStorage.getItem("user");
    
    if (userId != undefined){
      this.messageService.getAllConversationsForUser().subscribe(
        (conversations: Conversation[]) => {
          
        var allConversations = conversations['conversations']

        if (allConversations != undefined && allConversations != null){
          for (let p of allConversations){

            if(userId == p.user1){ 
              p.participant = this.loadUser(p.user2)
            }else{
              p.participant = this.loadUser(p.user1)
            }
          }
          this.conversations = []
          this.conversations = allConversations
          
        } else {
          this.conversations = []
        }
        
        // const datepipe: DatePipe = new DatePipe('en-US')
        // this.stringBirthday = datepipe.transform(this.user.birthday, 'dd-MMMM-YYYY') 
      })
    }
  }

  loadUser(userId){
    this.userService.getById(userId).subscribe(
      (user: any) => {
      var user = user['user']
      var name = user.name + ' ' + user.lastName
      return name
    })
  }

}
