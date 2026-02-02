import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from './api.constants';
import { Product } from './models';

export interface ProductFilters {
  vegeterian?: boolean | null;
  nuts?: boolean | null;
  spiciness?: number | null;
  categoryId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getFiltered(filters: ProductFilters): Observable<Product[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== null && v !== undefined) params = params.set(k, String(v));
    });

    return this.http.get<Product[]>(`${API_BASE}/api/Products/GetFiltered`, { params });
  }
}