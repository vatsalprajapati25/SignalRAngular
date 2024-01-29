import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@microsoft/signalr';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatInputComponent } from './pages/chat-input/chat-input.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PersonalChatComponent } from './pages/personal-chat/personal-chat.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from './materal.module';
import { CallinfoDialogComponent } from './pages/callinfo-dialog/callinfo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ChatInputComponent,
    MessagesComponent,
    PersonalChatComponent,
    VideoCallComponent,
    CallinfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
