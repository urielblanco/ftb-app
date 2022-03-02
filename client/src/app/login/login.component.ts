import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    console.log(this.loginForm.get('email'))
  }

  private buildForm(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value

    this.userSubscription = this.authService.login(email, password)
      .subscribe({
        next: (resp: any) => {
          this.authService.setLocalUser(resp.data.user);
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.log('💥 Failed authenticated the user!');
          console.log(err.message);
        }
      });



  }

  ngOnDestroy() {

  }
}
