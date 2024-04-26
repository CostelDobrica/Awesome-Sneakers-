import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/@core/models/product';
import { ProductService } from '../../../../@core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public productList?: Product[];
  public idCategory!: string;
  public filteredProductList?: Product[];
  public searchText: string = '';
  private productSubscription!: Subscription;

  constructor(public readonly productService: ProductService, private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idCategory = this.activatedRoute.snapshot.params['idCategory'];
    this.productService.get().subscribe();
    this.productSubscription = this.productService
      .getProductsByCategory(this.idCategory)
      .subscribe((products: Product[]) => {
        this.productList = products;
        this.filteredProductList = products;
      });
  }

  public onSearchByName(searchValue: string): void {
    if (searchValue) {
      this.searchText = searchValue;
      this.filteredProductList = this.productList?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.searchText = '';
      this.filteredProductList = this.productList;
    }
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
