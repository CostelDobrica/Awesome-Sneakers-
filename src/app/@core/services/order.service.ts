import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, tap, forkJoin } from 'rxjs';
import { HttpService } from '../api/http.service';
import { AccountResponse } from '../models/account';
import { OrderResponse, OrderItem } from '../models/orders';
import { Product } from '../models/product';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders$ = new BehaviorSubject<OrderResponse[] | null>(null);
  private orderItemsList$ = new BehaviorSubject<OrderItem[]>([]);

  constructor(
    private readonly http: HttpService,
    private readonly accountService: AccountService,
    private readonly sneakBar: MatSnackBar
  ) {}

  public createOrder(userCredentials: AccountResponse): Observable<OrderResponse> {
    return this.http
      .post('/orders', {
        orderItems: this.orderItemsList$.value,
        ...userCredentials,
      })
      .pipe(
        tap({
          next: () => {
            if (this.accountService.getAccount.value?.isAdmin) {
              this.getOrders().subscribe();
            }
            this.orderItemsList$.next([]);
          },
        })
      );
  }

  public editOrder(userCredentials: AccountResponse, orderId: string): Observable<any> {
    return forkJoin([this.createOrder(userCredentials), this.deleteOrder(orderId)]).pipe(
      tap({
        next: () => {
          this.getOrders().subscribe();
        },
      })
    );
  }

  public deleteOrder(id: string): Observable<OrderResponse> {
    return this.http.delete(`/orders/${id}`);
  }

  public editOrderStatus(id: string, status: string): Observable<OrderResponse> {
    return this.http.put(`/orders/${id}`, status);
  }

  public getOrdersByUser(id: string): Observable<OrderResponse[]> {
    return this.http.get(`/orders/userorder/${id}`);
  }

  public getOrders(): Observable<OrderResponse[]> {
    return this.http.get('/orders').pipe(
      tap({
        next: (orders: OrderResponse[]) => {
          if (this.accountService.getAccount.value?.isAdmin) {
            this.orders$.next(orders);
          }
        },
      })
    );
  }

  public addItemToOrder(productId: string, maxQuantity: number, quantity: number = 1): void {
    const cart: OrderItem[] = this.orderItemsList$.value;
    const orderItemAlreadyOnCart = cart.find((item: OrderItem) => item.product === productId);

    if (orderItemAlreadyOnCart) {
      if (maxQuantity < quantity + orderItemAlreadyOnCart.quantity) {
        this.sneakBar.open('The products is out of stock', '', {
          duration: 5000,
        });
        return;
      }

      orderItemAlreadyOnCart.quantity += quantity;
    } else {
      cart.push({ product: productId, quantity });
    }

    this.orderItemsList$.next(cart);
  }

  public editItemFromOrder(id: string, quantity: number, maxQuantity: number): void {
    const cart: OrderItem[] = this.orderItemsList$.value;
    const orderItem: OrderItem | undefined = cart.find((item: OrderItem) => item.product === id);

    if (orderItem) {
      if (maxQuantity >= quantity) {
        orderItem!.quantity = quantity;
        this.orderItemsList$.next(cart);
      }
    }
  }

  public removeItemFromOrder(id: string): void {
    let cart: OrderItem[] = this.orderItemsList$.value;
    cart = cart.filter((item: OrderItem) => item.product !== id);
    this.orderItemsList$.next(cart);
  }

  public getProductsByOrderItems(): Observable<Product[]> {
    const cart: OrderItem[] = this.orderItemsList$.value;

    const products$ = cart.map((order: OrderItem) => {
      return this.http.get(`/products/${order.product}`);
    });

    return forkJoin<Product[]>(products$);
  }

  public get getOrderItemsList(): BehaviorSubject<OrderItem[]> {
    return this.orderItemsList$;
  }

  public get getOrder(): BehaviorSubject<OrderResponse[] | null> {
    return this.orders$;
  }
}
