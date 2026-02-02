import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMenuComponent } from '../../components/category-menu/category-menu.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { ProductFilters } from '../../core/api/products.service';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryMenuComponent, FilterPanelComponent, ProductGridComponent],
  template: `
    <div class="layout">
      <aside class="left">
        <app-category-menu (categorySelected)="categoryId = $event"></app-category-menu>
      </aside>

     <main class="main">
  <app-filter-panel (filtersChanged)="filters = $event"></app-filter-panel>

  <app-product-grid
    [categoryId]="categoryId"
    [filters]="filters">
  </app-product-grid>
</main>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categoryId: number | null = null;
  filters: ProductFilters = { vegeterian: null, nuts: null, spiciness: null };
}