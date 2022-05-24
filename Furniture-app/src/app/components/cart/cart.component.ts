import { OrderService } from './../../services/order.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingCart: Array<any>;
  cartPrice: number = 0;
  len: number = 0;

  constructor(private cart: CartService, private order: OrderService) { }

  ngOnInit(): void {
    this.cart.getCart().subscribe(cs => {
      this.shoppingCart = cs.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as {}
        }
      });
      this.len = this.shoppingCart.length;
      this.recalculate();
    });
  }

  deleteCart(i: number) {
    return this.cart.deleteCart(this.shoppingCart[i].id);
  }

  updateCart(i: number) {
    return this.cart.updateCart(this.shoppingCart[i].id, this.shoppingCart[i].amount);
  }

  private recalculate() {
    this.cartPrice = 0;
    this.shoppingCart.forEach(l => {
      this.cartPrice += l.amount * l.price;
    });
    this.len = this.shoppingCart.length;
  }

  sendToOrder() {
    if (this.shoppingCart.length > 0) {
      let ord = this.shoppingCart;
      let data = {
        productList: ord,
        isSend: false,
        total: this.cartPrice
      }
      this.order.addToOrder(data).then(() => console.log(data)).catch(err => console.log(err));
      this.shoppingCart.forEach(l => {
        this.cart.deleteCart(l.id);
      });
    }
  }
}
