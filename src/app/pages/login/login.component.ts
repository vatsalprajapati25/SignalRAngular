import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common/service/common.service';
import { SharedService } from 'src/app/common/service/shared.service';
import { LoginService } from 'src/services/login/login.service';
import { VideoCallService } from 'src/services/video-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  validationMsg: any;
  loginForm: any;
  ShowPassword: boolean = false;
  labelConstant: any = {};


  ngOnInit(): void {
    this.sharedService.setData('Login');
    if(localStorage.getItem('authToken'))
    {
      this.router.navigate(['call-dashboard']);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private common: CommonService,
    private service: LoginService,
    private toaster : ToastrService,
    private sharedService: SharedService,
    private callService : VideoCallService
  ) {
    this.initLoginForm();
  }


  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailAddress: [
        '',
        [Validators.required, Validators.pattern(this.common.emailRegex)],
      ],
      password: ['', [Validators.required]],
    });
  }

  submitform() {
    let data = {
      emailId: this.loginForm['value'].emailAddress,
      password: this.loginForm['value'].password,
    };
    this.service.doLogin(data).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem(
            'authToken',
            this.common.Encrypt(JSON.stringify(response.data))
          );
          localStorage.setItem('emailId' , response.data.emailID);
          localStorage.setItem('userID' , response.data.userID);
          let peerId = this.callService.initPeer("");
          localStorage.setItem('peerId' , peerId);
          let obj = {
            PeerUserId : peerId,
            UserId : localStorage.getItem("userID")
          }
          this.service.savePeerId(obj).subscribe((response) => {
            if(response.success){
              this.router.navigate(['/call-dashboard']);
            }
          })  
        }
      },
      error: (er) => {
        console.error(er);
      },
    });
  }
}
