import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class BlockchainService {
  constructor(private http: HttpClient) {}

  getAllProofs() {
    return this.http.get(`${environment.apiUrl}/documents/proof/list`);
  }
}
