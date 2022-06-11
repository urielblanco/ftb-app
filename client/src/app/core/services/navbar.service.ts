import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  mode$: BehaviorSubject<string> = new BehaviorSubject<string>('navigator');
  title$: BehaviorSubject<string> = new BehaviorSubject<string>('Food Tracking');

  constructor(private router: Router) { }

  back() {
    this.router.navigate(['..']);
  }

  setModeNavigator(title: string) {
    this.mode$.next('navigator');
    this.title$.next(title);
  }

  setModeEditor(title: string) {
    this.mode$.next('editor');
    this.title$.next(title);
  }
}
