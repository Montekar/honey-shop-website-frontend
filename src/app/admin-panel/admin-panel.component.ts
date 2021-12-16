import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service'
import { OrderService } from '../_services/order.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  products: any;
  orders: any;

  constructor(private productService: ProductService,
              private  orderService: OrderService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.products = products)

    this.orderService.getAll()
      .pipe(first())
      .subscribe(products => this.orders = products)
  }

  deleteProduct(product: any) {
    this.productService.delete(product.id).pipe().subscribe()
    this.products = this.products.filter(p => p.id != product.id)
  }

  deleteOrder(order: any) {
    this.orderService.delete(order.id).pipe().subscribe()
    this.orders = this.orders.filter(o => o.id != order.id)
  }

  changedCompletion(event: any, order: any) {
    order.orderCompleted = event.target.value;
    this.orderService.update(order).pipe().subscribe()
  }

  changedPaid(event: any, order: any) {
    order.orderPaid = event.target.value;
    this.orderService.update(order).pipe().subscribe()
  }
}
