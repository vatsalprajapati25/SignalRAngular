import { Injectable } from '@angular/core';
import {
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // go to login if not authenticated
      return false;
    }
    
    return true;
  }
  
  canActivateChild():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // go to login if not authenticated
      return false;
    }
    return true;
  }
}
