import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  constructor(private _snackBar: MatSnackBar) { }
  
  openSnackBar(message: string, action: string = 'ok') {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 1500,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      // Reload the page after the snackbar is dismissed
      window.location.reload();
    });
  }
}
