import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent {

  protected save: boolean = false;
  protected formControl = new FormControl('', [Validators.required]);
  protected templateName: string = '';
  protected templateNames: Array<string> = [];

  private nameStorageKey: string = '__names__';
  private nameStorageSplitter: string = ';';

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {
    this.save = data;
    const namesString = localStorage.getItem(this.nameStorageKey);
    if (namesString != null && namesString != undefined)
    {
      if (namesString.trim() != '')
      {
        this.templateNames = namesString.split(this.nameStorageSplitter);
      }
    }
  }

  protected submit(): void {
    let keyName = this.createNameKey(this.templateName);
    if (this.templateName.trim() == '' || keyName == this.nameStorageKey) return;
    if (!this.templateNames.includes(keyName))
    {
      this.templateNames.push(keyName);
      localStorage.setItem(this.nameStorageKey, this.templateNames.join(this.nameStorageSplitter));
    }
    this.dialogRef.close({success: true, message: keyName});
  }

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected createNameKey(name: string): string {
    return name.trim().replace(' ', '_');
  }

  protected deleteCurrent(): void{
    let keyName = this.createNameKey(this.templateName);
    console.log(keyName);
    localStorage.removeItem(keyName);
    const index = this.templateNames.indexOf(keyName);
    if (index > -1) {
      this.templateNames.splice(index, 1);
      this.templateName = '';
      localStorage.setItem(this.nameStorageKey, this.templateNames.join(this.nameStorageSplitter));
    }
  }
}
