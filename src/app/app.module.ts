import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatInputComponent } from './pages/chat-input/chat-input.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PersonalChatComponent } from './pages/personal-chat/personal-chat.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materal.module';
import { CallinfoDialogComponent } from './pages/callinfo-dialog/callinfo-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HTTPListener, HTTPStatus } from './interceptor/HTTPListener';
import { CallDashboardComponent } from './pages/call-dashboard/call-dashboard.component';

const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ChatInputComponent,
    MessagesComponent,
    PersonalChatComponent,
    VideoCallComponent,
    CallinfoDialogComponent,
    LoginComponent,
    CallDashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot()

  ],
  providers: [
    RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
