import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; //pipeline to firebase database

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('post'); //initialize connection app -> firebase
  }

  public saveMessage(message) {
    this.allMessages.push(message);
  }

  public getAllMessages() {
    return this.allMessages;
  }
}
