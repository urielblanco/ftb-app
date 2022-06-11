import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent },
  { path: 'create', component: CreateDocumentComponent },
  { path: ':id', component: DetailDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
