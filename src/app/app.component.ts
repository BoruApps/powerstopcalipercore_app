import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Core Returns Flow', url: '/folder/Home/core-returns', icon: 'scan-circle' },
    { title: 'Customer Returns Flow', url: '/folder/Home/customer-returns', icon: 'cart' },
  ];
  public utilityPages = [
    { title: 'Profile', url: '/folder/Profile', icon: 'person-circle' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
      public storage: Storage
  ) {
    this.storage.create();
  }
}
