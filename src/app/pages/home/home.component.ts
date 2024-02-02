import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  apiErrorMessages: string[] = [];
  openChat: boolean = false;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) {
    this.submitForm();
  }

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.chatService.createChatConnection();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: [""]
    })
  }

  submitForm() {
    this.submitted = true;
    this.chatService.registerUser(localStorage.getItem("emailId")?.toString()).subscribe({
      next: (response) => {
        this.chatService.myName = localStorage.getItem("emailId")?.toString();
        this.openChat = true;
        this.userForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (typeof (err.error) !== 'object') {
          this.apiErrorMessages.push(err.error);
        }
      }
    })
  }

  closeChat() {
    this.openChat = false;
  }
}
