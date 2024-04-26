import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderItem } from 'src/app/@core/models/orders';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private cartSubscription!: Subscription;
  public products!: OrderItem[];

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.cartSubscription = this.orderService.getOrderItemsList.subscribe(orders => {
      this.products = orders
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
