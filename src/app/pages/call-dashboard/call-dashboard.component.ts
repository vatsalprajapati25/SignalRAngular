import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-call-dashboard',
  templateUrl: './call-dashboard.component.html',
  styleUrls: ['./call-dashboard.component.scss']
})
export class CallDashboardComponent {
  userList: any;
  loginUserID: number = 0;
  constructor(private service: LoginService,private route : Router) {

  }

  ngOnInit(): void {
    const storedUserID = localStorage.getItem("userID");
    this.loginUserID = storedUserID !== null ? +storedUserID : 0;
    this.getUserList();
  }

  async getUserList() {
    await this.service.getUserList().subscribe((response) => {
      this.userList = response.data;
      console.log(this.userList);
      
    })
  }

  connect(toUserId : number){
    this.service.getUserById(toUserId).subscribe((response) => {
      this.route.navigate(["/video/"+ response.data.userID])
    })
  }
}
