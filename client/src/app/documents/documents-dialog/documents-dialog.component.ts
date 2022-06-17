import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DialogData } from '../documents.component';

@Component({
  selector: 'app-documents-dialog',
  templateUrl: './documents-dialog.component.html',
  styleUrls: ['./documents-dialog.component.scss'],
})
export class DocumentsDialogComponent {
  qrCode: string;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.qrCode = `${environment.frontUrl}/documents/${data.id}`;
    this.name = data.name;
  }
}
