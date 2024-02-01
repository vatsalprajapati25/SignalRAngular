import { Injectable } from '@angular/core';
import { CommonService } from '../common/service/common.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  constructor(private commonService: CommonService) {}

  isLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const data = JSON.parse(this.commonService.Decrypt(authToken));
      if (data) {
        const payload = this.commonService.decodeBase64(
          data.jwtToken.split('.')[1]
        ); // decode payload of token
        const parsedPayload = JSON.parse(payload); // convert payload into an Object
        return parsedPayload.exp > Date.now() / 1000; // check if token is expired
      }
    }
    return false;
  }
}
