import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../core/state/cart.service';
import { BasketItem } from '../../core/api/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h2>Cart</h2>

      <div *ngIf="((items$ | async) ?? []).length === 0" class="empty">
        Cart is empty
      </div>

      <div class="row" *ngFor="let i of (items$ | async) ?? []">
        <div class="info">
          <div class="id">Product ID: {{ i.productId }}</div>
          <div class="price">{{ i.price }} ₾</div>
        </div>

        <div class="qty">
          <button (click)="minus(i)" [disabled]="i.quantity <= 1">−</button>
          <span>{{ i.quantity }}</span>
          <button (click)="plus(i)">+</button>
        </div>

        <button class="remove" (click)="remove(i.productId)">Remove</button>
      </div>

      <div class="total">
        <span>Total:</span>
        <strong>{{ (total$ | async) ?? 0 }} ₾</strong>
      </div>
    </div>
  `,
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  items$: Observable<BasketItem[]>;
  total$: Observable<number>;

  constructor(private cart: CartService) {
    this.items$ = this.cart.items$;
    this.total$ = this.cart.total$;
  }

  plus(item: BasketItem) {
    this.cart.update(item.productId, item.quantity + 1);
  }

  minus(item: BasketItem) {
    if (item.quantity <= 1) return;
    this.cart.update(item.productId, item.quantity - 1);
  }

  remove(productId: number) {
    this.cart.remove(productId);
  }
}