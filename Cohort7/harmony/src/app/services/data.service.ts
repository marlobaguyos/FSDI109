import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Friend } from '../models/friend';
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
    this.friendCollection = fb.collection<Friend>('friend'); // initialize connection
  }

  retrieveMessagesFromDB() {
    this.allMessages = this.messageCollection.valueChanges();
  }

  retrieveFriendsFromDB() {
    this.allFriends = this.friendCollection.valueChanges();
  }

  public saveMessage(message) {
    const plain = Object.assign({}, message);
    this.messageCollection.add(plain);
  }

  public getAllMessages() {
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
