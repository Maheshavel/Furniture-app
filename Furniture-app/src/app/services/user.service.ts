import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private as: AngularFirestore) { }

  addNewUser(id: string, name: string, address: string, isAdmin: boolean) {
    return this.as.doc("User/" + id).set({
      name,
      address,
      isAdmin
    });
  }
}
