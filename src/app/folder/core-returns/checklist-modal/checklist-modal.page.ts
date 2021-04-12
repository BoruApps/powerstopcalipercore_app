import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiRequestService} from '../../api-request.service';
import {NavController, ToastController, AlertController, ModalController,NavParams} from '@ionic/angular';

@Component({
    selector: 'app-checklist-modal',
    templateUrl: './checklist-modal.page.html',
    styleUrls: ['./checklist-modal.page.scss'],
})
export class ChecklistModalPage implements OnInit {
    isBracketReturnedYes: boolean=false;
    isBracketReturnedNo: boolean=false;
    isWasThreadYes: boolean=false;
    isWasThreadNo: boolean=false;
    isCastingDamagedYes: boolean=false;
    isCastingDamagedNo: boolean=false;
    so_detail : any;
    recordid : any;
    items : any;
    checklist : any;
    userdata: Object;
    constructor(
        public apiRequestService: ApiRequestService,
        public modalCtrl: ModalController,
        private navParams: NavParams,
        public alertController: AlertController
    ) {
    }

    ngOnInit() {
        this.apiRequestService.isLogged().then(result => {
            if (!(result == false)) {
                console.log('loading storage data (within param route function)', result);
                this.userdata = result;
                this.loadData();
            } else {
                console.log('nothing in storage, going back to login');
                this.apiRequestService.logout();
            }
        });

    }

    loadData(){
        this.checklist = this.navParams.data.checklist;
        this.recordid = this.navParams.data.recordid;
        this.so_detail = this.navParams.data.so_detail;
        this.items = this.navParams.data.items;
        if(Object.keys(this.checklist).length > 0){
            if(this.checklist.braket_return == 1){
                this.isBracketReturnedYes = true;
            }else if(this.checklist.braket_return == 0){
                this.isBracketReturnedNo = true;
            }

            if(this.checklist.thread_update == 1){
                this.isWasThreadYes = true;
            }else if(this.checklist.thread_update == 0){
                this.isWasThreadNo = true;
            }

            if(this.checklist.casting_damaged == 1){
                this.isCastingDamagedYes = true;
            }else if(this.checklist.casting_damaged == 0){
                this.isCastingDamagedNo = true;
            }
        }
    }

    addUpdate(event) {
        var fieldname = event.target.name;
        console.log(fieldname);
        var is_checked = event.detail.checked;
        console.log(is_checked);
        if(fieldname == 'bracket_returned_yes'){
            if(is_checked) {
                this.isBracketReturnedYes = true;
                this.isBracketReturnedNo = false;
            }else{
                this.isBracketReturnedYes = false;
            }

        }
        if(fieldname == 'bracket_returned_no'){
            if(is_checked) {
                this.isBracketReturnedNo = true;
                this.isBracketReturnedYes = false;
            }else{
                this.isBracketReturnedNo = false;
            }

        }
        if(fieldname == 'was_thread_yes'){
            if(is_checked) {
                this.isWasThreadYes = true;
                this.isWasThreadNo = false;
            }else{
                this.isWasThreadYes = false;
            }

        }
        if(fieldname == 'was_thread_no'){
            if(is_checked) {
                this.isWasThreadNo = true;
                this.isWasThreadYes = false;
            }else{
                this.isWasThreadNo = false;
            }

        }
        if(fieldname == 'casting_damaged_yes'){
            if(is_checked) {
                this.isCastingDamagedYes = true;
                this.isCastingDamagedNo = false;
            }else{
                this.isCastingDamagedYes = false;
            }

        }
        if(fieldname == 'casting_damaged_no'){
            if(is_checked) {
                this.isCastingDamagedNo = true;
                this.isCastingDamagedYes = false;
            }else{
                this.isCastingDamagedNo = false;
            }

        }
    }

  async  SaveCheckList(recordid){
        const alert = await this.alertController.create({
            cssClass: 'confirm',
            header: 'Confirm!',
            message: "Are you sure you've checked everything in correctly?",
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        var params = {
                            recordid: recordid,
                            isBracketReturnedYes: this.isBracketReturnedYes,
                            isBracketReturnedNo: this.isBracketReturnedNo,
                            isCastingDamagedYes: this.isCastingDamagedYes,
                            isCastingDamagedNo: this.isCastingDamagedNo,
                            isWasThreadYes: this.isWasThreadYes,
                            isWasThreadNo: this.isWasThreadNo
                        }
                        this.apiRequestService.post(this.apiRequestService.ENDPOINT_SAVE_CHECKLIST, params).subscribe(response => {
                            console.log(response);
                            Swal.fire(response.body.message);
                            this.modalCtrl.dismiss();
                        },  error => {
                            Swal.fire('Can not connect to Server.');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
    closeModal() {
        this.modalCtrl.dismiss();
    }


}