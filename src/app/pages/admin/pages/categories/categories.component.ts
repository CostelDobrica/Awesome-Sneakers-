import { Category } from 'src/app/@core/models/category';
import { CategoryService } from 'src/app/@core/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryModalComponent } from '../../components/add-category-modal/add-category-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories!: Category[];
  public searchText: string = '';
  public filteredCategoryList?: Category[];
  private categorySubscription!: Subscription;

  constructor(public readonly categoryService: CategoryService, private dialogRef: MatDialog) {}

  public onAddModal(): void {
    this.dialogRef.open(AddCategoryModalComponent, { width: '390px', height: '340px' });
  }

  ngOnInit(): void {
    this.categoryService.get().subscribe();
    this.categorySubscription = this.categoryService.getCategories.subscribe((categories: Category[]) => {
      this.categories = categories;
      this.filteredCategoryList = categories;
    });
  }

  public onSearchByName(searchValue: string): void {
    if (searchValue) {
      this.searchText = searchValue;
      this.filteredCategoryList = this.categories?.filter((category: Category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.searchText = '';
      this.filteredCategoryList = this.categories;
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}
