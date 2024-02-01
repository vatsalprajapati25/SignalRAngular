import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import { ApiResponse } from '../../models/commonModel';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../api-url-helper/api-url-helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  public emailRegex: RegExp =
    /^(?=.{1,30}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  private errorMessage: string =
    'Something went wrong. Please try again after sometime.';

  private KEY = CryptoJS.enc.Hex.parse(
    'c604f199ff095b4ced4caf373264e84045f71b384ce39628ee8adca2b27109e8'
  );

  private IV = CryptoJS.enc.Hex.parse('47b5b25d579c0bed815c9166b4f37ee8');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private api: ApiUrlHelper,
    private modalService: NgbModal,
    private snackBar : MatSnackBar
  ) { }

  public Encrypt(clearText: string): string {
    // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf16LE.parse(clearText),
      this.KEY,
      {
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
  }

  public Decrypt(cipherText: string): string {
    // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
    let decrypt = CryptoJS.AES.decrypt(cipherText, this.KEY, {
      iv: this.IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
      .toString(CryptoJS.enc.Utf8)
      .toString();

    return decrypt.replaceAll('\x00', '').replaceAll(/&quot;/g, '"');
  }

  doGetFromAsset(apiUrl: string): Observable<ApiResponse> {
    const url = `${apiUrl}`;
    return this.http.get<ApiResponse>(url).pipe(
      tap((data) => this.log(`doGet success`, data)),
      catchError(
        this.handleError<ApiResponse>(`doGet url = ${JSON.stringify(apiUrl)}`)
      )
    );
  }

  doGet(apiUrl: string): Observable<ApiResponse> {
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.get<ApiResponse>(url).pipe(
      tap((data) => this.log(`doGet success`, data)),
      catchError(
        this.handleError<ApiResponse>(`doGet url = ${JSON.stringify(apiUrl)}`)
      )
    );
  }

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData).pipe(
      tap((data) => this.log(`doPost success`, data)),
      catchError(
        this.handleError<ApiResponse>(
          `doPost data = ${JSON.stringify(postData)}`
        )
      )
    );
  }

  doPut(apiUrl: string, postData: any): Observable<ApiResponse> {
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.put<ApiResponse>(url, postData).pipe(
      tap((data) => this.log(`doPut success`, data)),
      catchError(
        this.handleError<ApiResponse>(
          `doPut data = ${JSON.stringify(postData)}`
        )
      )
    );
  }

  doDelete(apiUrl: string, idtoDelete: number): Observable<ApiResponse> {
    const options = {
      body: {
        id: idtoDelete,
      },
    };
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.delete<ApiResponse>(url, options).pipe(
      tap((data) => this.log(`doDelete success`, data)),
      catchError(
        this.handleError<ApiResponse>(
          `doDelete url = ${JSON.stringify(apiUrl)}`
        )
      )
    );
  }

  showNotification(
    title: string,
    message: string,
    type: NotificationType,
    autoClose: boolean
  ) {
    this.snackBar.open(message, 'Close');
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`, {
        success: false,
        message: '',
        data: undefined,
        TAID: 0
      });

      //display error message
      if (error.status == ResponseType.UNAUTHORIZED) {
        this.errorMessage = 'Unauthorized Access';
      } else if (error.status == ResponseType.ACCESS_FORBIDDEN) {
        this.errorMessage = 'User is logged into another browser or device';
      }
      else if (error.status == ResponseType.UNDER_MAINTAINANCE) {
        this.errorMessage = 'Site is under maintance';
        this.underMaintance();
      }
      this.showNotification(
        '',
        this.errorMessage,
        NotificationType.ERROR,
        true
      );
      let emptyData = {
        Data: null,
        Message: this.errorMessage,
        Success: false,
        TAID: 0,
      };
      return of(emptyData as T);
    };
  }

  underMaintance() {
    this.router.navigate(['/under-maintenance'])
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string, data: ApiResponse) {
    console.log(data);
    if (data && !data.success) {
      //display error message
      this.showNotification(
        '',
        data.message,
        NotificationType.ERROR,
        true
      );
    }
  }

  encodeBase64(plainString: string): string {
    return Buffer.from(plainString, 'ascii').toString('base64');
  }

  decodeBase64(Base64String: string): string {
    if (Base64String) {
      return Buffer.from(Base64String, 'base64').toString('ascii');
    } else {
      return '""';
    }
  }
  isSystemAlert: boolean = false;
  public href: any;
}

export enum NotificationType {
  INFO = 1,
  SUCCESS = 2,
  WARNING = 3,
  ERROR = 4,
  SHOW = 5,
}

export enum ResponseType {
  UNAUTHORIZED = 401,
  UNDER_MAINTAINANCE = 503,
  ACCESS_FORBIDDEN = 403
}

export enum PreviewFileType {
  DOC = "doc",
  DOCX = "docx",
  PDF = "pdf",
  JPG = "jpg",
  JPEG = "jpeg",
  PNG = "png",
  IMG = "img"

}
