import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountResponse } from 'src/app/@core/models/account';
import { OrderItem } from 'src/app/@core/models/orders';
import { Product } from 'src/app/@core/models/product';
import { AccountService } from 'src/app/@core/services/account.service';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  public products!: Product[];
  public account!: null | AccountResponse;
  public accountSubscription!: Subscription;
  public cartSubscription!: Subscription;
  public totalPrice: number = 0;

  constructor(public readonly orderService: OrderService, public readonly accountService: AccountService) {}

  ngOnInit(): void {
    this.accountSubscription = this.accountService.getAccount.subscribe((account: AccountResponse | null) => {
      this.account = account;
    });

    this.cartSubscription = this.orderService.getOrderItemsList.subscribe((cart: OrderItem[]) => {
      if (cart.length > 0) {
        this.orderService.getProductsByOrderItems().subscribe((products: Product[]) => {
          this.products = products;
          this.cartTotalPrice(products, cart);
        });
      } else {
        this.products = [];
        this.totalPrice = 0;
      }
    });
  }

  public cartTotalPrice(products: Product[], cart: OrderItem[]): void {
    this.totalPrice = 0;
    cart.forEach((order: OrderItem) => {
      const findProduct = products.find((product: Product) => product._id === order.product);
      this.totalPrice += findProduct!.price * order.quantity;
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
