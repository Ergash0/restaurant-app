import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BasketItem, Product } from '../api/models';

const LS_KEY = 'restaurant_cart_v1';

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try { return JSON.parse(s) as T; } catch { return null; }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<BasketItem[]>(this.load());
  items$: Observable<BasketItem[]> = this.itemsSubject.asObservable();

  count$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((s, i) => s + i.quantity, 0))
  );

  total$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((s, i) => s + i.quantity * i.price, 0))
  );

  // 🔥 красиво: корзина с названием и картинкой (если продукт добавляли)
  viewItems$: Observable<Array<BasketItem & { name?: string | null; image?: string | null }>> =
    this.items$.pipe(map(items => items));

  add(product: Product) {
    const items = [...this.itemsSubject.value];
    const found = items.find(i => i.productId === product.id);

    if (found) {
      found.quantity += 1;
      // обновим price если надо
      found.price = product.price;
      // @ts-ignore (если BasketItem не содержит name/image — это ок, TS может ругаться)
      found.name = product.name ?? null;
      // @ts-ignore
      found.image = product.image ?? null;
    } else {
      items.push({
        productId: product.id,
        quantity: 1,
        price: product.price,
        // эти поля не обязательные, просто для UI
        // @ts-ignore
        name: product.name ?? null,
        // @ts-ignore
        image: product.image ?? null,
      } as any);
    }

    this.set(items);
  }

  update(productId: number, quantity: number) {
    const items = this.itemsSubject.value.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    );
    this.set(items);
  }

  remove(productId: number) {
    this.set(this.itemsSubject.value.filter(i => i.productId !== productId));
  }

  clear() {
    this.set([]);
  }

  private set(items: BasketItem[]) {
    this.itemsSubject.next(items);
    this.save(items);
  }

  private save(items: BasketItem[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private load(): BasketItem[] {
    // SSR-safe: если вдруг нет localStorage
    if (typeof localStorage === 'undefined') return [];
    const data = safeParse<BasketItem[]>(localStorage.getItem(LS_KEY));
    return Array.isArray(data) ? data : [];
  }
}