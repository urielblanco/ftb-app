import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate() {
    if (this.authService.isLoginSubject.value) {
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }

}
