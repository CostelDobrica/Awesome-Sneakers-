import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/@core/models/category';
import { CategoryService } from 'src/app/@core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categories!: Category[];
  private categorySubscription!: Subscription;

  constructor(public readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe();
    this.categorySubscription = this.categoryService.getCategories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}
