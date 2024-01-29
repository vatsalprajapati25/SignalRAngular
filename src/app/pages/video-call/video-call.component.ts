import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Peer from 'peerjs';
import { Observable, filter, of, switchMap } from 'rxjs';
import { SignalingService } from 'src/services/signaling.service';
import { VideoCallService } from 'src/services/video-call.service';
import { CallinfoDialogComponent, DialogData } from '../callinfo-dialog/callinfo-dialog.component';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements AfterViewInit {
  public isCallStarted$: Observable<boolean>;
  private peerId: string;

  // @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  // @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  // @ViewChild('localVideo') localVideo!: ElementRef;
  // @ViewChild('remoteVideo') remoteVideo!: ElementRef;


  constructor(public dialog: MatDialog, private callService: VideoCallService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();
  }
  
  ngAfterViewInit(): void {
    const localVideo = document.getElementById("local-video") as HTMLVideoElement;
    const remoteVideo = document.getElementById("remote-video") as HTMLVideoElement;
    this.callService.localStream$
      .pipe(filter(res => !!res))
      .subscribe((stream:any) => localVideo.srcObject = stream)
    this.callService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe((stream:any) => remoteVideo.srcObject = stream)
  }
  
  ngOnDestroy(): void {
    this.callService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    console.log(this.peerId);
    
    let dialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    const dialogRef = this.dialog.open(CallinfoDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap((peerId:any) => {
          
          return joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
        }
        ),
      )
      .subscribe(_  => { });
  }

  public endCall() {
    this.callService.closeMediaCall();
  }
}
