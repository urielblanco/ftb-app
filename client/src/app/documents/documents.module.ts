import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsService } from './documents.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DocumentsDialogComponent } from './documents-dialog/documents-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    DocumentsComponent,
    CreateDocumentComponent,
    DetailDocumentComponent,
    EditDocumentComponent,
    DocumentsDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DocumentsRoutingModule,
    HttpClientModule,
    QRCodeModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [DocumentsService],
})
export class DocumentsModule {}
