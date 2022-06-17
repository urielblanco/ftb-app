import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DocumentsService {
  documentSelected: any | null;

  constructor(private http: HttpClient) {}

  createDocument(document: any) {
    return this.http.post(`${environment.apiUrl}/documents`, document);
  }

  updateDocument(document: any, id: string) {
    return this.http.patch(`${environment.apiUrl}/documents/${id}`, document);
  }

  getDocuments() {
    return this.http.get(`${environment.apiUrl}/documents`);
  }

  getDocument(id: string) {
    return this.http.get(`${environment.apiUrl}/documents/${id}`);
  }

  getDocumentHistory(slug: string) {
    return this.http.get(`${environment.apiUrl}/documents/history/${slug}`);
  }

  signInBlockchain() {
    return this.http.post(`${environment.apiUrl}/documents/proof`, null);
  }
}
