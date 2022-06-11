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

@NgModule({
  declarations: [DocumentsComponent, CreateDocumentComponent, DetailDocumentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DocumentsRoutingModule,
    HttpClientModule,
  ],
  providers: [DocumentsService],
})
export class DocumentsModule {}
