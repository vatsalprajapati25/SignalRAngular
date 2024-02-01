import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlHelper {
  public url = {
    validationMsg: 'assets/jsons/validations.json',
    labelConstant : 'assets/jsons/labelConstant.json',
    account: {
      login: 'User/login',
      list: 'User/list',
      savePeer: 'User/save-peer',
      getUserById: 'User/get-user-by-id/{id}'
    }
  };
}
