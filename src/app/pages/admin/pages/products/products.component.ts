import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/@core/models/product';
import { ProductService } from 'src/app/@core/services/product.service';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products!: Product[];
  public searchText: string = '';
  public filteredProductList?: Product[];
  private productSubscription!: Subscription;

  constructor(public readonly productService: ProductService, private readonly matDialog: MatDialog) {}

  public onAddModal(): void {
      this.matDialog.open(AddProductModalComponent, {
        width: '380px',
        height: '575px'
      });
  }

  ngOnInit(): void {
    this.productService.get().subscribe();
    this.productSubscription = this.productService.getProducts.subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProductList = products;
    });
  }

  public onSearchByName(searchValue: string): void {
    if (searchValue) {
      this.searchText = searchValue;
      this.filteredProductList = this.products?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.searchText = '';
      this.filteredProductList = this.products;
    }
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
