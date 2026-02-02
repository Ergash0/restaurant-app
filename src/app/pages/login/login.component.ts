import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/state/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="wrap">
      <h2>Login</h2>

      <div class="card">
        <label>Email</label>
        <input [(ngModel)]="email" type="email" placeholder="example@mail.com" />

        <label>Password</label>
        <input [(ngModel)]="password" type="password" placeholder="••••••••" />

        <button (click)="onLogin()">Login</button>

        <p class="hint">
          Fake login
        </p>

        <p class="err" *ngIf="error">{{ error }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.error = '';
    try {
      this.auth.login(this.email.trim(), this.password);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      this.error = e?.message ?? 'Login failed';
    }
  }
}