import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orderList: Array<any>;
  isAdmin: boolean = false;

  constructor(private order: OrderService, private as: AuthService) { }

  ngOnInit(): void {
    this.order.getOrder().subscribe(cs => {
      this.orderList = cs.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as {}
        }
      });
    });
    this.as.getInfo().then(cs => this.isAdmin = cs);
  }

  deleteOrder(i: number) {
    return this.order.deleteOrder(this.orderList[i].id);
  }
}
