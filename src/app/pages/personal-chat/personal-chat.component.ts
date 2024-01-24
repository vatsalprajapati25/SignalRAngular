import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss']
})
export class PersonalChatComponent {
  @Input() toUser = "";

  constructor(public modelService : NgbActiveModal, public chatService : ChatService) {
    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.chatService.closePersonalChat(this.toUser);
  }

  sendMessage(content : string){
    this.chatService.sendPersonalMessage(this.toUser, content);
  }
}
