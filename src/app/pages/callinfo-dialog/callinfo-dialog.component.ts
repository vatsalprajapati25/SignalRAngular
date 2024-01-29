import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-callinfo-dialog',
  templateUrl: './callinfo-dialog.component.html',
  styleUrls: ['./callinfo-dialog.component.scss']
})
export class CallinfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CallinfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) { }

  public showCopiedSnackBar() {
    this._snackBar.open('Peer ID Copied!', 'Hurrah', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

export interface DialogData {
  peerId?: string;
  joinCall: boolean
}
