import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlHelper {
  public url = {
    account: {
      login: 'User/login',
      list: 'User/list',
      savePeer: 'User/save-peer',
      getUserById: 'User/get-user-by-id/{id}'
    }
  };
}
