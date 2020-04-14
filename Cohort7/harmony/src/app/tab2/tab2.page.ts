import { Component } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  message: Message = new Message();
  constructor() {}

  onPost() {
    this.message.from = 'Marlo';
    this.message.createdOn = new Date();
    console.log('posting', this.message);
  }

}
