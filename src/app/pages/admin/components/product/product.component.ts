import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/@core/models/product';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() public product!: Product;

  constructor(private readonly matDialog: MatDialog) {}

  public onEditModal(): void {
    this.matDialog.open(EditProductModalComponent, {
      width: '380px',
      height: '575px',
      data: this.product,
    });
  }
}
