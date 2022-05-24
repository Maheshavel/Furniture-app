import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private fs: AngularFirestore, private as: AuthService) { }

  addToOrder(Cart) {
    return this.fs.collection(`User/${this.as.userID}/order`).add(Cart);
  }

  getOrder() {
    return this.fs.collection(`User/${this.as.userID}/order`).snapshotChanges();
  }
  
  deleteOrder(id) {
    return this.fs.doc(`User/${this.as.userID}/order/${id}`).delete();
  }
}
