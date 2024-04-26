import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/@core/models/category';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() public category!: Category;

  constructor(private readonly refDialog: MatDialog) {}

  public onEditModal(): void {
    this.refDialog.open(EditCategoryModalComponent, {
      width:'400px',
      height:'340px',
      data: this.category,
    });
  }
}
