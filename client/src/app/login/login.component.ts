import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

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
    console.log(this.loginForm.value);

    this.authService.login({ name: 'admin', role: 'admin' });
    this.router.navigate(['/profile']);
  }
}
