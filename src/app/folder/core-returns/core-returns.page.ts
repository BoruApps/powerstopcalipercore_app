import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiRequestService} from '../api-request.service';
import {NavController, ToastController, AlertController, ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";
import {ChecklistModalPage} from './checklist-modal/checklist-modal.page';

@Component({
  selector: 'app-core-returns',
  templateUrl: './core-returns.page.html',
  styleUrls: ['./core-returns.page.scss'],
})
export class CoreReturnsPage implements OnInit {

  constructor(
      public apiRequestService: ApiRequestService,
      public modalCtrl: ModalController
  ) { }

  public barcode: any = '';
  userdata: Object;

  ngOnInit(){
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

  async showBarcodeModal() {
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
      };
      this.apiRequestService.showLoading();
      this.apiRequestService.post(this.apiRequestService.ENDPOINT_CORE_BARCODE, params).subscribe(response => {
        console.log(response);
        if (response.body.success){
          var data = response.body.data;
            //scan line item, show checklist
            var record = data.record;
            var so_detail = data.so_detail;
            var items = data.items;
            this.openModal(record,so_detail, items);
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
      document.getElementById('swal2-input').addEventListener('input', function() {
      let confirm: HTMLElement  = document.querySelector('.swal2-confirm') as HTMLElement;
      confirm.click();
      })
  }

  async openModal(record,so_detail, items){
    const modal = await this.modalCtrl.create({
      component: ChecklistModalPage,
      cssClass: 'checklist-modal',
      componentProps: {
        "recordid": record,
        "so_detail": so_detail,
        "items": items,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
    });

    return await modal.present();
  }

}
