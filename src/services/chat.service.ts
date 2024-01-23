import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Message } from 'src/models/message';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myName: string = '';
  onlineUsers : string[] = [];
  private chatConnection?: HubConnection;
  messages: Message[] = [];

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`, user, { responseType: 'text' });
  }

  createChatConnection() {
    this.chatConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}ChatHub`).withAutomaticReconnect().build();
    this.chatConnection.start().catch(error => {
      console.log(error);
    })
    this.chatConnection.on('UserConnected', () => {
      this.addUserConnectionId();
    })

    this.chatConnection.on('OnlineUsers', (OnlineUsers) => {
      this.onlineUsers = [...OnlineUsers];
    })

    this.chatConnection.on("NewMessage", (newMessage : Message) => {
      this.messages = [...this.messages, newMessage]
    })
  }

  stopChatConnection() {
    this.chatConnection?.stop().catch( error => {
      console.log(error);
      
    })
  }

  async addUserConnectionId(){
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName)
    .catch(error => console.log(error)
    );
  }

  async sendMessage(content : string){
    const message : Message = {
      from : this.myName,
      content
    }

    return this.chatConnection?.invoke("ReceiveMessage", message)
    .catch(error => console.log(error)
    )

  }


}
