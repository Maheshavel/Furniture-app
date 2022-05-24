import { OrderAdminService } from './../../services/order-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  userList: Array<any> = [];
  orderList: Array<any> = [];

  constructor(private oas: OrderAdminService) { }

  ngOnInit(): void {
    this.oas.getUsers().subscribe(cs => {
      this.userList = cs.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as {}
        }
      });
      this.userList.forEach(cs => {
        if (cs.isAdmin) {
          this.userList.splice(this.userList.indexOf(cs), 1);
        }
      });
      this.orderList = new Array(this.userList.length);
      this.userList.forEach(cs => this.oas.getOrders(cs.id).subscribe(x => {
        this.orderList[this.userList.indexOf(cs)] = ((x.map(y => {
          return {
            userID: cs.id,
            id: y.payload.doc.id,
            ...y.payload.doc.data() as {}
          }
        })));
      }));
    });
  }

  updateOrder(i: number, j: number) {
    return this.oas.updateOrder(this.orderList[i][j].userID, this.orderList[i][j].id, this.orderList[i][j].isSend);
  }
}
