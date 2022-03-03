import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  constructor(private http: HttpClient) {
    if (this.hasUser()) {
      this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    }
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }


  public setLocalUser(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.user = user;
    this.isLoginSubject.next(true);
  }

  public login(email: any, password: any) {
    return this.http.post(`${environment.apiUrl}/users/login`, { email, password });
  }

  public logout(): void {
    this.user = null;
    localStorage.removeItem('userInfo');
    this.isLoginSubject.next(false);
  }

  private hasUser(): boolean {
    return !!localStorage.getItem('userInfo');
  }

}
