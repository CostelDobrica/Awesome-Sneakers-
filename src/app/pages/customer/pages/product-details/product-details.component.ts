import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/@core/models/product';
import { OrderService } from 'src/app/@core/services/order.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public amount: number = 1;
  public product: Product | undefined;
  public productId!: string | null;
  public productSubscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('idProduct');

    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  public onDecrement(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  public onIncrement(): void {
    if (this.amount < this.product!.quantity) {
      this.amount++;
    }
  }

  public onAddCart(): void {
    this.orderService.addItemToOrder(this.product!._id, this.product!.quantity, this.amount);
  }
}
