import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { VideoCallService } from 'src/services/video-call.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements AfterViewInit {

  public isCallStarted$: Observable<boolean>;
  private toPeerId: string = "";
  private toPeerUserId: string;

  constructor(public dialog: MatDialog, 
    private callService: VideoCallService, 
    private http: HttpClient, 
    private activatedroute: ActivatedRoute, 
    private service: LoginService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.toPeerUserId = this.activatedroute.snapshot.params['toID'];
  }

  ngOnInit(): void {
    this.service.getUserById(parseInt(this.toPeerUserId)).subscribe((response) => {
      this.toPeerId = response.data.peerUserId.toString();
      this.callService.initPeer(localStorage.getItem("peerId")?.toString());
    });
  }

  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit(): void {

    this.callService.localStream$
      .pipe(filter(res => !!res))
      .subscribe((stream: any) => this.localVideo.nativeElement.srcObject = stream)


    this.callService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe((stream: any) => this.remoteVideo.nativeElement.srcObject = stream)
  }


  ngOnDestroy(): void {
    this.remoteVideo.nativeElement.srcObject = null;
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.poster = '/assets/video-placeholder.jpg';
    this.callService.destroyPeer();
  }

  public async showDialog(joinCall: boolean) {
    this.service.getUserById(parseInt(this.toPeerUserId)).subscribe(async (response) => {
      this.toPeerId = response.data.peerUserId.toString();
      const dialogData = joinCall
        ? { peerId: null, joinCall: true }
        : { peerId: this.toPeerId, joinCall: false };

      if (joinCall) {
        await this.callService.establishMediaCall(this.toPeerId)
      }
      else {
        await this.callService.enableCallAnswer()
      }
    })

  }

  public async shareScreen(joinCall: boolean) {
    this.service.getUserById(parseInt(this.toPeerUserId)).subscribe(async (response) => {
      this.toPeerId = response.data.peerUserId.toString();
      const dialogData = joinCall
        ? { peerId: null, joinCall: true }
        : { peerId: this.toPeerId, joinCall: false };

      if (joinCall) {
        await this.callService.establishScreenCall(this.toPeerId)
      }
      else {
        await this.callService.enableScreenCallAnswer()
      }
    })
  }

  public endCall(): void {
    this.remoteVideo.nativeElement.srcObject = null;
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.poster = '/assets/video-placeholder.jpg';
    this.callService.closeMediaCall();
  }
}
