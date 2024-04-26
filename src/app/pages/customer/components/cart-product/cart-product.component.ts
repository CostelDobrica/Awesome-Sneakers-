import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/@core/models/orders';
import { Product } from 'src/app/@core/models/product';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  @Input() public product!: Product;

  public quantityProductOnCart!: number;
  public quantityReference: any;

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    const cart = this.orderService.getOrderItemsList.value;
    const quantity = cart.find((order: OrderItem) => order.product === this.product._id);
    this.quantityProductOnCart = quantity!.quantity;
  }

  public onEdit(event: any): void {
    this.orderService.editItemFromOrder(this.product._id, event, this.product.quantity);
  }

  public delete(): any {
    this.orderService.removeItemFromOrder(this.product._id);
  }
}
