import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../core/state/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <a routerLink="/" class="logo">Restaurant</a>

      <a routerLink="/cart" class="cart">
        🛒 Cart <span class="badge">{{ count$ | async }}</span>
      </a>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  count$: Observable<number>;

  constructor(private cart: CartService) {
    // ✅ безопасно и правильно
    this.count$ = this.cart.count$;
  }
}