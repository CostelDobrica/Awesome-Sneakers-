import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/@core/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() public category!: Category;

  constructor(private readonly router: Router, private readonly activeRoute: ActivatedRoute) {}

  public onCategory(): void {
    this.router.navigate([`${this.category._id}`], { relativeTo: this.activeRoute });
  }
}
