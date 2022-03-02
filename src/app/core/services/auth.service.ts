import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  constructor() { }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }


  public login(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.user = user;
    this.isLoginSubject.next(true);
  }

  public validate(email: any, password: any) {
    // return this.http.post('/api/authenticate', { 'username': email, 'password': password }).toPromise()
    return Promise.resolve(true);
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
