import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlHelper } from 'src/app/common/api-url-helper/api-url-helper';
import { CommonService } from 'src/app/common/service/common.service';
import { ApiResponse } from 'src/app/models/commonModel';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  
  constructor(private api: ApiUrlHelper, private common: CommonService) {}

  doLogin(data: any): Observable<ApiResponse> {
    return this.common.doPost(this.api.url.account.login, data);
  }

  getUserList() : Observable<any> {
    return this.common.doGet(this.api.url.account.list);
  }

  getUserById(id: number) : Observable<any> {
    return this.common.doGet(this.api.url.account.getUserById.replace('{id}', id.toString()));
  }

  

  savePeerId(data: any){
    return this.common.doPost(this.api.url.account.savePeer, data);
  }
}
