import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  throwError,
} from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { CommonService } from '../common/service/common.service';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {

  constructor(
    private router: Router,
    private status: HTTPStatus,
    private commonService: CommonService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let Spinner = document.getElementById('bootstrapSpinner');
    if (Spinner) {
      if (!req.url.includes('assets/jsons/')) {
        Spinner.style.display = 'block';
      }
    }

    const authReq = req.clone({
      headers: this.addExtraHeaders(req.headers),
    });

    return next.handle(authReq).pipe(
      map((event) => {
        return event;
      }),
      catchError((error) => {
        if (Spinner) {
          if (!req.url.includes('assets/jsons/')) {
            Spinner.style.display = 'none';
          }
        }
        if (error.status == 401 || error.status == 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
      finalize(() => {
        if (Spinner) {
          if (!req.url.includes('assets/jsons/')) {
            Spinner.style.display = 'none';
          }
        }
        this.status.setHttpStatus(false);
      })
    );
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const data = JSON.parse(this.commonService.Decrypt(authToken));
      headers = headers.append('Authorization', 'Bearer ' + data.jwtToken);
    }
    return headers;
  }
}
