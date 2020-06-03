import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public showMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
    });
  }
}
