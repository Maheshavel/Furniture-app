import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private fs: AngularFirestore, private as: AuthService) { }

  addToCart(Product) {
    return this.fs.collection(`User/${this.as.userID}/cart`).add(Product);
  }

  getCart() {
    return this.fs.collection(`User/${this.as.userID}/cart`).snapshotChanges();
  }
  
  deleteCart(id) {
    return this.fs.doc(`User/${this.as.userID}/cart/${id}`).delete();
  }

  updateCart(id, amount) {
    return this.fs.doc(`User/${this.as.userID}/cart/${id}`).update({amount});
  }
}
