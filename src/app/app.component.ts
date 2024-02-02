import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SignalR';
  isLogin : boolean = false;
  ngOnInit(): void {
    if(localStorage.getItem("authToken") != null && localStorage.getItem("authToken") != "" && localStorage.getItem("authToken") != undefined){
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }

  constructor(private route : Router) { }

  logout(){
    localStorage.clear();
    this.route.navigate(["/login"])
  }

  routes(route : number) {
    if(route == 1) {
      this.route.navigate(["/call-dashboard"])
    }
    else if (route == 2) {
      this.route.navigate(["/chat"])
    }
  }
}
