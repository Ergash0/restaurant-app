import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/api/categories.service';
import { Category } from '../../core/api/models';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu">
      <button
        *ngFor="let c of categories"
        (click)="select(c.id)"
        class="item"
        [class.active]="c.id === activeId"
      >
        {{ c.name }}
      </button>
    </div>
  `,
  styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<number>();

  categories: Category[] = [];
  activeId: number | null = null;

  constructor(private api: CategoriesService) {}

  ngOnInit() {
    this.api.getAll().subscribe(data => {
      this.categories = data;
      if (data.length) {
        this.activeId = data[0].id;
        this.categorySelected.emit(this.activeId);
      }
    });
  }

  select(id: number) {
    this.activeId = id;
    this.categorySelected.emit(id);
  }
}