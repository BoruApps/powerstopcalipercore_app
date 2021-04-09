import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiRequestService} from '../api-request.service';
import {ChecklistModalPage} from './checklist-modal/checklist-modal.page';
import {NavController, ToastController, AlertController, ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-customer-returns',
  templateUrl: './customer-returns.page.html',
  styleUrls: ['./customer-returns.page.scss'],
})
export class CustomerReturnsPage implements OnInit {

  constructor(
      public apiRequestService: ApiRequestService,
      public modalCtrl: ModalController,
      public storage: Storage,
      private navCtrl: NavController,
      private router: Router
  ) { }
  
  public barcode: any = '';
  userdata: Object;

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
      var params = {
        barcode: barcode
      }
      this.apiRequestService.showLoading();
      this.apiRequestService.post(this.apiRequestService.ENDPOINT_CHECK_BARCODE, params).subscribe(response => {
        console.log(response);
        if (response.body.success){
          var data = response.body.data;
          if(data.scan_so == 1){
            Swal.fire(response.body.message);
          }else{
              //scan line item, show checklist
            var recordid = data.record;
            var seq_no = data.seq_no;
            this.openModal(recordid, seq_no);
          }
        }else{
          Swal.fire(response.body.message);
        }
        this.apiRequestService.hideLoading();
      },  error => {
        Swal.fire('Can not connect to Server.');
        this.apiRequestService.hideLoading();
      });
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

  async openModal(recordid, seq_no) {
  const modal = await this.modalCtrl.create({
    component: ChecklistModalPage,
    cssClass: 'checklist-modal',
    componentProps: {
      "recordid": recordid,
      "seq_no": seq_no,
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
  });

  return await modal.present();
}

  ngOnInit() {
    this.apiRequestService.isLogged().then(result => {
      if (!(result == false)) {
        console.log('loading storage data (within param route function)', result);
        this.userdata = result;
      } else {
        console.log('nothing in storage, going back to login');
        this.apiRequestService.logout();
      }
    });
  }

  ngAfterContentInit(){ 
   //console.log(document.getElementById('showbarc'))
    
  }

}
