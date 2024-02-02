import { Component, Input } from '@angular/core';
import { Message } from 'src/models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
 @Input() messages: any = [];
}
