import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {

  constructor(private fs: AngularFirestore) {}

  getUsers() {
    return this.fs.collection(`User`).snapshotChanges();
  }

  getOrders(id: number) {
    return this.fs.collection(`User/${id}/order`).snapshotChanges();
  }

  updateOrder(userID, orderID, isSend) {
    return this.fs.doc(`User/${userID}/order/${orderID}`).update({isSend});
  }
}
