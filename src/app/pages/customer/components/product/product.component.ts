import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/@core/services/order.service';
import { Product } from '../../../../@core/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() public product!: Product;

  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly orderService: OrderService,
  ) {}

  public goToProductDetails(): void {
    this.router.navigate([`product/${this.product._id}`], { relativeTo: this.activeRoute });
  }

  public addToCart(event: Event): void {
    event.stopPropagation();
    this.orderService.addItemToOrder(this.product?._id, this.product.quantity)
  }
}
