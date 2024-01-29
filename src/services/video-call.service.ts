import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaConnection } from 'peerjs';
import {  PeerJSOption } from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Peer } from 'peerjs';

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

  constructor(private snackBar: MatSnackBar) { }

  public initPeer(): string {
      const peerJsOptions: PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
              ],
            }]
        }
      };
      try {
        let id = uuidv4();
        this.peer = new Peer(id, peerJsOptions);
        console.log(id);
        
        return id;
      } catch (error) {
        console.error(error);
        return '';
      }
  }


  public async establishMediaCall(remotePeerId: string) {
    try {
      debugger
      const stream =  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

      const connection = this.peer.connect(remotePeerId);
      connection.on('error', err => {
        console.error(err);
        this.snackBar.open("Unable to connect to remote peer", 'Close');
      });
      
      this.mediaCall = this.peer.call(remotePeerId, await stream);
      if (!this.mediaCall) {
        let errorMessage = 'Unable to connect to remote peer';
        this.snackBar.open(errorMessage, 'Close');
        throw new Error(errorMessage);
      }
      this.localStreamBs.next(await stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on('stream',
        (remoteStream: any) => {
          this.remoteStreamBs.next(remoteStream);
        });
      this.mediaCall.on('error', (err: any) => {
        this.snackBar.open("Unable to connect to remote peer", 'Close');
        console.error(err);
        this.isCallStartedBs.next(false);
      });
      this.mediaCall.on('close', () => this.onCallClose());
    }
    catch (ex) {
      console.error(ex);
      this.snackBar.open("connection-closed", 'Close');
      this.isCallStartedBs.next(false);
    }
  }


  public async enableCallAnswer() {
    try {
      const stream = navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      this.localStreamBs.next(await stream);
      this.peer.on('call', async (call) => {

        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(await stream);
        this.mediaCall.on('stream', (remoteStream: any) => {
          this.remoteStreamBs.next(remoteStream);
        });
        this.mediaCall.on('error', (err: any) => {
          this.snackBar.open("connection-closed", 'Close');
          this.isCallStartedBs.next(false);
          console.error(err);
        });
        this.mediaCall.on('close', () => this.onCallClose());
      });
    }
    catch (ex) {
      console.error(ex);
      this.snackBar.open("connection-closed", 'Close');
      this.isCallStartedBs.next(false);
    }
  }

  private onCallClose() {
    this.remoteStreamBs?.value.getTracks().forEach(track => {
      track.stop();
    });
    this.localStreamBs?.value.getTracks().forEach(track => {
      track.stop();
    });
    this.snackBar.open('Call Ended', 'Close');
  }

  public closeMediaCall() {
    this.mediaCall?.close();
    if (!this.mediaCall) {
      this.onCallClose()
    }
    this.isCallStartedBs.next(false);
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }
}

