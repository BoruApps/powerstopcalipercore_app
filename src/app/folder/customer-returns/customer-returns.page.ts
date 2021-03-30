import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-returns',
  templateUrl: './customer-returns.page.html',
  styleUrls: ['./customer-returns.page.scss'],
})
export class CustomerReturnsPage implements OnInit {

  constructor() { }
  
  public barcode: any = '';

  async showBarcodeModal(){
    //Swal.fire('Testing', 'Test', 'success'); //this works
    const {value: barcode } = await Swal.fire({
      title: 'Scan or Enter Barcode',
      input: 'text',  
      inputPlaceholder: 'Enter Barcode #',
      inputLabel: "Barcode #"
    })
    if (barcode) { 
      this.barcode = barcode;
      Swal.fire(`Barcode scanned: ${barcode}`);
      //Instead redirect to VT
    }
  }

  ngOnInit() {
    
  }

}
