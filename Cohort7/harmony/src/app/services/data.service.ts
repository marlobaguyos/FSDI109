import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Friend } from '../models/friend';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; // pipeline to firebase database

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>; // pipeline to firebase db

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('posts'); // initialize connection app -> firebase
    this.friendCollection = fb.collection<Friend>('friends'); // initialize connection
  }

  //Good way to read data (w/o dates)
  // retrieveMessagesFromDB() {
  //   this.allMessages = this.messageCollection.valueChanges();
  // }

  retrieveMessagesFromDB(){
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data();
          var d: any = data.createdOn; // <- firebase data format
          if(d){
            data.createdOn = new firestore.Timestamp(
              d.seconds,
              d.nanoseconds
              ).toDate();
            }
            return {... data }
          })
        })
      );
    }

  retrieveFriendsFromDB() {
    this.allFriends = this.friendCollection.valueChanges();
  }

  public saveMessage(message) {
    const plain = Object.assign({}, message);
    this.messageCollection.add(plain);
  }

  public getAllMessages() {
    this.retrieveMessagesFromDB();
    return this.allMessages;
  }

  public saveFriend(friend) {
    const plain = Object.assign({}, friend);
    this.friendCollection.add(plain);
  }

  public getAllFriends() {
    this.retrieveFriendsFromDB();
    return this.allFriends;
  }
}



