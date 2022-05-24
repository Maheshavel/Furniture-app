import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.default.User>;
  userID: string = "";

  constructor(private fire: AngularFireAuth, private fs: AngularFirestore) {
    this.user = fire.user;
  }

  signup(email: string, password: string) {
    return this.fire.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.fire.signInWithEmailAndPassword(email, password);
  }

  getInfo(){
    return this.fs.doc(`User/${this.userID}`).ref.get().then(cs => cs.get(`isAdmin`));
  }

  logout() {
    return this.fire.signOut();
  }
}
