import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private activityTimeout = 10; // 30 seconds
  private activityTimer:any;
  private activitySubject = new Subject<void>();

  resetTimer(): void {
    clearTimeout(this.activityTimer);
    this.activityTimer = setTimeout(() => {
      this.activitySubject.next();
    }, this.activityTimeout * 1000);
  }

  onActivity(time:number): void {
    if(time==0)
    {
      this.resetTimer();
    }
    else
    {
       this.activityTimeout=time;
    }
  }

  getTimeoutObservable(): Observable<void> {
    return this.activitySubject.asObservable();
  }
}