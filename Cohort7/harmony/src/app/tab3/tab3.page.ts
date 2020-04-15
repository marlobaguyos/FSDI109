import { Component } from '@angular/core';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  friend: Friend = new Friend();

  constructor() {}

  onSave(){
    console.log(this.friend);
  }
}
