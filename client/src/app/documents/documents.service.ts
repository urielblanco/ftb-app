import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
    return this.http.get(`${environment.apiUrl}/documents`).pipe(
      map((response: any) => {
        console.log(response);
        response.data.documents = response.data.documents.sort(
          (a: any, b: any) =>
            new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime()
        );

        return response;
      })
    );
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
