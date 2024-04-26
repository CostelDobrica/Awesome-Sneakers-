import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() order!: any;
  public display: boolean = false;
  public moreThanFourItems: any[] = [];
  public firstFourItems: any[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.order.orderItems.slice(0, 4).forEach((item: any) => {
      this.firstFourItems.push(item);
    });

    if (this.order.orderItems.length > 4) {
      this.order.orderItems.slice(4, this.order.orderItems.length).forEach((item: any) => {
        this.moreThanFourItems.push(item);
      });
    }
  }

  public goToProduct(product: any): void {
    this.router.navigate([`home/${product.product.category._id}/product/${product.product._id}`]);
  }

  public expand(): void {
    this.display = true;
  }

  public collapse(): void {
    this.display = false;
  }
}
