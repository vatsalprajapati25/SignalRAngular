import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/service/common.service';
import { PersonalChatComponent } from 'src/app/pages/personal-chat/personal-chat.component';
import { environment } from 'src/environments/environment';
import { Message } from 'src/models/message';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myName: any = '';
  onlineUsers: [] = [];
  private signalRConnection?: HubConnection;
  messages: Message[] = [];
  personalMessages: Message[] = [];
  personalChatStarted: boolean = false;

  constructor(private httpClient: HttpClient, public modelService: NgbModal, private common: CommonService) { }

  registerUser(userEmail: any) {
    let obj = {
      emailID: userEmail
    }
    return this.common.doPost(`chat/update-user-connection`, obj);
    // return [obj];
    // return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`, user, { responseType: 'text' });
  }

  async createChatConnection() {
    this.signalRConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}ChatHub`).withAutomaticReconnect().build();
    await this.signalRConnection.start().then((response) => {
    }).catch(error => {
      console.log(error);
    })


    this.signalRConnection.on('UserConnected', () => {
      this.addUserConnectionId();
    })

    this.signalRConnection.on('OnlineUsers', (OnlineUsers: any) => {
      this.onlineUsers = OnlineUsers;
      this.getOldChats();
    })

    this.signalRConnection.on('GetOldChats', (oldChats) => {
      this.messages = oldChats;
    })

    this.signalRConnection.on("OpenPrivateChat", (newMessage: Message) => {
      this.personalMessages = [...this.personalMessages, newMessage];
      
      this.personalChatStarted = true;
      const model = this.modelService.open(PersonalChatComponent);
      model.componentInstance.toUser = newMessage.from;
    })

    this.signalRConnection.on("NewMessage", (newMessage: any) => {
      this.messages = newMessage;
    })

    this.signalRConnection.on("NewPrivateMessage", (newMessage: Message) => {
      this.personalMessages = [...this.personalMessages, newMessage]
    })

    this.signalRConnection.on("ClosePrivateChat", () => {
      this.personalChatStarted = false;
      this.personalMessages = [];
      this.modelService.dismissAll();
    })
  }

  stopChatConnection() {
    this.signalRConnection?.stop().catch(error => {
      console.log(error);
    })
  }

  async addUserConnectionId() {
    return await this.signalRConnection?.invoke('AddUserConnectionId', localStorage.getItem("emailId"))
      .catch(error => console.log(error)
      );
  }

  async getOldChats(){
    var data = await this.signalRConnection?.invoke("GetOldChats")
    .catch(error => console.log(error)
    )
  }

  async sendMessage(content: string) {
    const message: any = {
      from: localStorage.getItem("userID")?.toString(),
      content
    }
    return this.signalRConnection?.invoke("ReceiveMessage", message)
      .catch(error => console.log(error)
      )
  }

  async closePersonalChat(toUser: string) {
    return this.signalRConnection?.invoke('RemovePrivateChat', this.myName, toUser)
      .catch(error => console.log(error)
      );
  }

  async sendPersonalMessage(to: string, content: string) {
    const message: Message = {
      from: this.myName,
      to,
      content
    }

    if (!this.personalChatStarted) {
      this.personalChatStarted = true;
      return this.signalRConnection?.invoke("Chat", message)
        .then(() => {
          this.personalMessages = [...this.personalMessages, message]
        })
        .catch(error => console.log(error)
        )
    }
    else {
      return this.signalRConnection?.invoke("ReceivePrivateMessages", message)
        .catch(error => console.log(error)
        )
    }
  }
}
