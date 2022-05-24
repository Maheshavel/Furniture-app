import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  add: number = -1;

  products: Array<any> = [];

  constructor(private ps: ProductsService, private cart: CartService, private as: AuthService, private rout: Router) {
  }

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe(data => this.products = data);
  }

  
  addToCart(index: number) {
    if (this.as.userID) {
      this.add = +index;
    }
    else {
      this.rout.navigate(['/login']);
    }
    
  }

  buy(amount) {
    if (amount > 0) {
      let selectedProduct = this.products[this.add];
      let data = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        amount: +amount
      }
      this.cart.addToCart(data).then(() => this.add = -1).catch(err => console.log(err));
    }
  }
}
