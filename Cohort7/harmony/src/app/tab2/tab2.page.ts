import { Component } from '@angular/core';
import { Message } from '../models/message';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  message: Message = new Message();

  constructor(private share: ShareService)

  constructor() {}

  onPost() {
    this.message.from = this.share.userName;
    this.message.createdOn = new Date();
    console.log('posting', this.message);
  }

}
