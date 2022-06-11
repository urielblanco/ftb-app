import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) {}

  createDocument(document: any) {
    return this.http.post(`${environment.apiUrl}/documents`, document);
  }

  getDocuments() {
    return this.http.get(`${environment.apiUrl}/documents`);
  }

  getDocument(id: string) {
    return this.http.get(`${environment.apiUrl}/documents/${id}`);
  }
}
