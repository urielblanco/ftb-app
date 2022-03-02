import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isAuthenticated: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router) {
    this.isAuthenticated = authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/documents']);
  }
}
