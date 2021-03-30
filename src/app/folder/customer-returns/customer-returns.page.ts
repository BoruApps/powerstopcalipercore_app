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
    this.addSwalEventListener()
    if (barcode) { 
      this.barcode = barcode;
      Swal.fire(`Barcode scanned: ${barcode}`);
      //Instead redirect to VT
    }
  }

  addSwalEventListener(){ 
    console.log('doing')
    document.getElementById('swal2-input').addEventListener('input', function() {
      console.log('updated')
      let confirm: HTMLElement  = document.querySelector('.swal2-confirm') as HTMLElement;
      confirm.click();
    })
  }

  ngOnInit() {
    
  }

  ngAfterContentInit(){ 
   //console.log(document.getElementById('showbarc'))
    
  }

}
