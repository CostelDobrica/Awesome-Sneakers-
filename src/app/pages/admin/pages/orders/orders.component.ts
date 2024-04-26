import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/@core/models/orders';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders: OrderResponse[] = [];
  public filteredOrderList!: OrderResponse[];
  public searchText: string = '';

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders: OrderResponse[]) => {
      this.orders = orders;
      this.filteredOrderList = orders;
    });
  }

  public onSearchById(searchValue: string): void {
    if (searchValue) {
      this.searchText = searchValue;
      this.filteredOrderList = this.orders?.filter((order: OrderResponse) => order._id.includes(searchValue));
    } else {
      this.searchText = '';
      this.filteredOrderList = this.orders;
    }
  }

  public addOrder(): void {}
}
