import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private fs: AngularFirestore, private storage: AngularFireStorage) { }

  getAllProducts() {
    return this.fs.collection('Product').valueChanges();
  }

  addProduct(name: string, price: number, description: string, image: File) {
    let refer = this.storage.ref('Images/' + image.name);
    refer.put(image).then(() => {refer.getDownloadURL().subscribe(picturePath => {
      this.fs.collection('Product').add({name, price, description, picturePath})
    })});
  }

  getProducts() {
    return this.fs.collection('Product').snapshotChanges();
  }

  updateProduct(id, name: string, price: number, description: string){
    return this.fs.doc(`Product/${id}`).update({name, price, description});
  }

  deleteProduct(id) {
    return this.fs.doc(`Product/${id}`).delete();
  }
}
