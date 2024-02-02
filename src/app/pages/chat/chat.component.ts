import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/services/chat.service';
import { PersonalChatComponent } from '../personal-chat/personal-chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Output() closeChatEmitter = new EventEmitter();
  users : any;
  loginEmail = localStorage.getItem("emailId")?.toString();
  constructor(public chatService : ChatService, public modelService : NgbModal, private route : Router) {
  }

  ngOnDestroy(): void {
    this.chatService.stopChatConnection()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.users = this.chatService.onlineUsers;
    }, 1000);
  }

  backToHome(){
    this.closeChatEmitter.emit();
    this.route.navigate(["/call-dashboard"]);
  }

  sendMessage(content : string) {
    this.chatService.sendMessage(content);
  }

  privateChat(toUser : string){
    const model = this.modelService.open(PersonalChatComponent);
    model.componentInstance.toUser = toUser;
  }
}
