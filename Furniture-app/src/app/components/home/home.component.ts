import { AuthService } from './../../services/auth.service';
import { CartService } from './../../services/cart.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<any> = [
  ]

  constructor(private ps: ProductsService, private cart: CartService, private as: AuthService, private rout: Router) {
  }

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe(data => this.products = data);
  }
}
