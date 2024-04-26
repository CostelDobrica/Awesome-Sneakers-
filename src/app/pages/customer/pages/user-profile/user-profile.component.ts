import { Component, OnInit } from '@angular/core';
import { AccountResponse } from 'src/app/@core/models/account';
import { OrderResponse } from 'src/app/@core/models/orders';
import { AccountService } from 'src/app/@core/services/account.service';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user!: AccountResponse | null;
  public orders: OrderResponse[] = [];

  constructor(private readonly orderService: OrderService, private readonly accountService: AccountService) {}

  ngOnInit(): void {
    this.user = this.accountService.getAccount.value;
    this.orderService.getOrdersByUser(this.user!._id).subscribe((orders: OrderResponse[]) => {
      this.orders = orders;
    });
  }
}
