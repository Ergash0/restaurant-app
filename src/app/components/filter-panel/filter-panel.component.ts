import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilters } from '../../core/api/products.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters">
      <label class="item">
        <input type="checkbox" [(ngModel)]="vegeterian" (change)="emit()" />
        Vegetarian
      </label>

      <label class="item">
        <input type="checkbox" [(ngModel)]="nuts" (change)="emit()" />
        Nuts
      </label>

      <label class="item">
        Spiciness:
        <select [(ngModel)]="spiciness" (change)="emit()">
          <option [ngValue]="null">Any</option>
          <option [ngValue]="0">0</option>
          <option [ngValue]="1">1</option>
          <option [ngValue]="2">2</option>
          <option [ngValue]="3">3</option>
        </select>
      </label>

      <button class="clear" (click)="clear()">Clear</button>
    </div>
  `,
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  @Output() filtersChanged = new EventEmitter<ProductFilters>();

  vegeterian = false;
  nuts = false;
  spiciness: number | null = null;

  emit() {
    this.filtersChanged.emit({
      vegeterian: this.vegeterian ? true : null,
      nuts: this.nuts ? true : null,
      spiciness: this.spiciness,
    });
  }

  clear() {
    this.vegeterian = false;
    this.nuts = false;
    this.spiciness = null;
    this.emit();
  }
}