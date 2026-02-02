import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, ProductFilters } from '../../core/api/products.service';
import { Product } from '../../core/api/models';
import { CartService } from '../../core/state/cart.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid" *ngIf="products.length; else empty">
      <div class="card" *ngFor="let p of products">
        <img *ngIf="p.image; else noimg" [src]="p.image" class="img" />
        <ng-template #noimg><div class="img placeholder">No image</div></ng-template>

        <div class="name">{{ p.name }}</div>
        <div class="price">{{ p.price }} ₾</div>

        <button class="btn" (click)="addToCart(p)">Add to Cart</button>
      </div>
    </div>

    <ng-template #empty><p>No products</p></ng-template>
  `,
  styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent implements OnChanges {
  @Input() categoryId: number | null = null;
  @Input() filters: ProductFilters = {};

  products: Product[] = [];

  constructor(private api: ProductsService, private cart: CartService) {}

  ngOnChanges() {
    if (!this.categoryId) return;

    this.api.getFiltered({ ...this.filters, categoryId: this.categoryId })
      .subscribe(data => this.products = data);
  }

addToCart(p: Product) {
  this.cart.add(p); 
}
}