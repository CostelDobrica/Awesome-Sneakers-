import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountResponse } from 'src/app/@core/models/account';
import { AccountService } from 'src/app/@core/services/account.service';
import { OrderService } from 'src/app/@core/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() totalPrice!: number;

  public account?: null | AccountResponse;
  public orderForm!: FormGroup;
  public userId!: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountService,
    private readonly orderService: OrderService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const { firstName, lastName, email, phone, shippingAddress, city, zip, country, _id } =
      this.accountService.getAccount.value!;
    this.orderForm = this.formBuilder.group({
      firstName: [firstName, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      email: [email, [Validators.email, Validators.required]],
      phone: [phone, [Validators.pattern(/^07\d{8}$/), Validators.required]],
      shippingAddress: [shippingAddress, [Validators.required]],
      city: [city, [Validators.required]],
      zip: [zip, [Validators.required]],
      country: [country, [Validators.required]],
    });
    this.userId = _id;
  }

  public createOrder(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder({ ...this.orderForm.value, user: this.userId }).subscribe({
        next: () => this.snackBar.open('Your order has been placed succesfully', '', { duration: 5000 }),
        error: () => this.snackBar.open('Your order could not be placed', '', { duration: 5000 }),
      });
    }
  }
}
