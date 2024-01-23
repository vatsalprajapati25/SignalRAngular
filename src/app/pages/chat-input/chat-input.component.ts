import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

  @Output() contentEmitter = new EventEmitter();
  content :string ="";
  constructor() {
    
  }

  sendMessage(){
    if(this.content.trim() !== ""){
      this.contentEmitter.emit(this.content);
    }

    this.content = "";
  }
}
