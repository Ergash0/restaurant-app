import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  name: string;
}

const TOKEN_KEY = 'restaurant_token_v1';
const USER_KEY = 'restaurant_user_v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.loadToken());
  token$ = this.tokenSubject.asObservable();

  // удобно для template/guards
  get token(): string | null {
    return this.tokenSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  get user(): User | null {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  login(email: string, password: string) {
    // ✅ fake check (можешь упростить/усложнить)
    if (!email || !password) throw new Error('Email and password are required');

    const fakeToken = `fake_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const user: User = {
      email,
      name: email.split('@')[0] || 'User',
    };

    // SSR safe
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, fakeToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    this.tokenSubject.next(fakeToken);
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    this.tokenSubject.next(null);
  }

  private loadToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }
}