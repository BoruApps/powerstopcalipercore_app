import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-returns',
  templateUrl: './customer-returns.page.html',
  styleUrls: ['./customer-returns.page.scss'],
})
export class CustomerReturnsPage implements OnInit {

  constructor() { }

  showSwalTest(){
    Swal.fire('Testing', 'Test', 'success'); //this works
  }

  ngOnInit() {
    
  }

}
