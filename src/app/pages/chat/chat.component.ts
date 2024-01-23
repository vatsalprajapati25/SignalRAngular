import { Component, EventEmitter, Output } from '@angular/core';
import { eventListeners } from '@popperjs/core';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService : ChatService) {
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.chatService.stopChatConnection()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chatService.createChatConnection();
  }

  backToHome(){
    this.closeChatEmitter.emit();
  }
}
