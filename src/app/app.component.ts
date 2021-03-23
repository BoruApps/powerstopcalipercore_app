import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Core Returns Flow', url: '/folder/Home/core-returns', icon: 'scan-circle' },
    { title: 'Customer Returns Flow', url: '/folder/Home/customer-returns', icon: 'scan' },
    { title: 'Profile', url: '/folder/Profile', icon: 'person-circle' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
