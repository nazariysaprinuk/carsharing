import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Order } from "./order-interface";
import { Observable, of, throwError, from } from "rxjs";
import { delay, catchError, map, take, tap, find } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore'
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private afs: AngularFirestore, private userService: UserService) { }
  getOrders() {
    return this.afs.collection('orders').snapshotChanges();
  }
  getOrder(id) {
    return this.afs.collection('orders').doc(id).snapshotChanges()
  }
  deleteOrder(id) {
    this.afs.collection('orders').doc(id).delete()
    return of({}).pipe(delay(2000))
  }
  createOrder(order: Order) {
    let id = this.afs.createId();
    order.id = id;
    this.afs.collection('orders').add(order)
    return of(order);
  }
  updateOrder(order: Order) {
    const id = order.id
    delete order.id
    this.afs.collection('orders').doc(id).update(order)
    return of(order).pipe(delay(1200));
  }
}
