import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/services/chat.service';
import { PersonalChatComponent } from '../personal-chat/personal-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService : ChatService, public modelService : NgbModal) {
    
  }

  ngOnDestroy(): void {
    this.chatService.stopChatConnection()
  }

  ngOnInit(): void {
    this.chatService.createChatConnection();
  }

  backToHome(){
    this.closeChatEmitter.emit();
  }

  sendMessage(content : string) {
    this.chatService.sendMessage(content);
  }

  privateChat(toUser : string){
    const model = this.modelService.open(PersonalChatComponent);
    model.componentInstance.toUser = toUser;
  }
}
