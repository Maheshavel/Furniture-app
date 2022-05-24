import { CartService } from './../../services/cart.service';
import { ProductsService } from './../../services/products.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('image') image: ElementRef
  productsArray: Array<any>;

  constructor(private ps: ProductsService, private cart: CartService) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(cs => {
      this.productsArray = cs.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data() as {}
        }
      })
    });
  }

  addNewProduct(f: NgForm) {
    let name = f.value.name, price = f.value.price, 
    description = f.value.description, image = (this.image.nativeElement as HTMLInputElement).files[0];
    this.ps.addProduct(name, price, description, image);
  }

  updateProduct(i: number) {
    return this.ps.updateProduct(this.productsArray[i].id, this.productsArray[i].name,
      this.productsArray[i].price, this.productsArray[i].description);
  }

  deleteProduct(i: number) {
    return this.ps.deleteProduct(this.productsArray[i].id);
  }
}
