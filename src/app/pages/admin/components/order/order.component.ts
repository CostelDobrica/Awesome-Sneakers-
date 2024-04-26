import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() order!: any;

  constructor() {}

  public acceptOrder(): void {}

  public rejectOrder(): void {}

  public editOrder(): void {}
}
