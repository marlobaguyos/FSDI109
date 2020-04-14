import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allMessage: Observable<Message[]>;
  messageCollection: AngularFireStoreCollection
  constructor() { }

  public saveMessage(message) {
    this.allMessage.push(message);
  }

  public getAllMessages() {
    return this.allMessage;
  }
}
