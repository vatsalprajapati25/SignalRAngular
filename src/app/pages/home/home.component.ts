import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userForm : FormGroup = new FormGroup({});
  submitted: boolean = false;
  apiErrorMessages : string[] = [];
  openChat : boolean = false;

  constructor(private formBuilder : FormBuilder, private chatService : ChatService) { 
    this.chatService.createChatConnection();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.userForm = this.formBuilder.group({
      name : ["", [Validators.required,Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  submitForm(){
    this.submitted = true;
    if(this.userForm.valid){
      this.chatService.registerUser(this.userForm.value).subscribe({
        next : (response) => {
          this.chatService.myName = this.userForm.get('name')?.value;
          this.openChat = true;
          this.userForm.reset();
          this.submitted = false;
          console.log(response);
        },
        error : (err) => {
          if(typeof(err.error) !== 'object'){
            this.apiErrorMessages.push(err.error);
          }
        }
      })
    }
  }

  closeChat(){
    this.openChat = false;
  }
}
