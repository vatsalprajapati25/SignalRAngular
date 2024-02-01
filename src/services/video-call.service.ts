import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaConnection } from 'peerjs';
import { PeerJSOption } from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Peer } from 'peerjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  private peer = new Peer();

  private localStreamBs = new BehaviorSubject<MediaStream>(new MediaStream());
  public localStream$ = this.localStreamBs.asObservable();
  private remoteStreamBs = new BehaviorSubject<MediaStream>(new MediaStream());
  public remoteStream$ = this.remoteStreamBs.asObservable();
  private isCallStartedBs = new Subject<boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  mediaCall: MediaConnection | undefined;

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  public initPeer(peerId: string | null = null): string {
    const peerJsOptions: PeerJSOption = {
      debug: 3,
      config: {
        iceServers: [
          {
            urls: [
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
            ],
          },
        ],
      },
    };

    try {
      if (!peerId) {
        peerId = uuidv4();
      }

      this.peer = new Peer(peerId, peerJsOptions);
      console.log(peerId, "logged in peer id");
      return peerId;
    }
    catch (error) {
      console.error(error);
      return '';
    }
  }


  private async establishCall(remotePeerId: string, isScreenShare: boolean = false) {
    try {
      const stream = isScreenShare
        ? await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        : await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const connection = this.peer.connect(remotePeerId);
      connection.on('error', this.handleConnectionError.bind(this));

      this.mediaCall = this.peer.call(remotePeerId, stream);
      if (!this.mediaCall) {
        throw new Error('Unable to connect to remote peer');
      }

      this.localStreamBs.next(stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on('stream', this.handleRemoteStream.bind(this));
      this.mediaCall.on('error', this.handleCallError.bind(this));
      this.mediaCall.on('close', this.onCallClose.bind(this));
    } catch (ex) {
      this.handleCallException(ex);
    }
  }

  public async establishMediaCall(remotePeerId: string) {
    await this.establishCall(remotePeerId);
  }

  public async establishScreenCall(remotePeerId: string) {
    await this.establishCall(remotePeerId, true);
  }

  public async enableCallAnswer() {
    await this.enableAnswer(false);
  }

  public async enableScreenCallAnswer() {
    await this.enableAnswer(true);
  }

  private async enableAnswer(isScreenShare: boolean) {
    try {
      const stream = isScreenShare
        ? await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        : await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      this.localStreamBs.next(stream);
      this.peer.on('call', async (call) => {
        this.mediaCall = call;
        this.isCallStartedBs.next(true);
        this.mediaCall.answer(stream);

        this.mediaCall.on('stream', this.handleRemoteStream.bind(this));
        this.mediaCall.on('error', this.handleCallError.bind(this));
        this.mediaCall.on('close', this.onCallClose.bind(this));
      });
    } catch (ex) {
      this.handleCallException(ex);
    }
  }

  private handleConnectionError(err: any) {
    console.error(err);
    this.snackBar.open("Unable to connect to remote peer", 'Close');
  }

  private handleRemoteStream(remoteStream: any) {
    this.remoteStreamBs.next(remoteStream);
  }

  private handleCallError(err: any) {
    console.error(err);
    this.snackBar.open("Unable to connect to remote peer", 'Close');
    this.isCallStartedBs.next(false);
  }


  private handleCallException(ex: any) {
    console.error(ex);
    this.snackBar.open("Requested device not found!!", 'Close');
    this.isCallStartedBs.next(false);
  }

  private onCallClose() {
    if (this.remoteStreamBs && this.remoteStreamBs.value) {
      this.closeTracks(this.remoteStreamBs.value.getTracks());
    }

    if (this.localStreamBs && this.localStreamBs.value) {
      this.closeTracks(this.localStreamBs.value.getTracks());
    }

    this.isCallStartedBs.next(false);
    this.snackBar.open('Call Ended4', 'Close');
    this.router.navigate(['/call-dashboard']);
  }

  private closeTracks(tracks: MediaStreamTrack[]) {
    tracks.forEach(track => {
      track.stop();
    });
  }

  public closeMediaCall() {
    if (this.mediaCall) {
      this.mediaCall.close();
    }
    this.onCallClose();
    this.isCallStartedBs.next(false);
  }

  public destroyPeer() {
    if (this.mediaCall) {
      this.mediaCall.close();
    }
    this.disconnectAndDestroyPeer();
  }

  private disconnectAndDestroyPeer() {
    if (this.peer) {
      this.peer.disconnect();
      this.peer.destroy();
    }
  }

}

