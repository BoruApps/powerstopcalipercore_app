import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiRequestService} from '../../api-request.service';
import {NavController, ToastController, AlertController, ModalController} from '@ionic/angular';

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
    constructor(
        public apiRequestService: ApiRequestService,
        public modalCtrl: ModalController
    ) {
    }

    ngOnInit() {

    }

    addUpdate(event) {
        var $fields = [];
        var fieldname = event.target.name;
        console.log(fieldname);
        var is_checked = event.detail.checked;
        console.log(is_checked);
        /*if(is_checked){
            $fields[fieldname]
        }
        if(fieldname == 'actual_condition_no'){
            if(is_checked) {
                this.isActualConditionNo = true;
                this.isActualConditionYes = false;
            }else{
                this.isActualConditionNo = false;
            }

        }
        if(fieldname == 'actual_condition_yes'){
            if(is_checked) {
                this.isActualConditionYes = true;
                this.isActualConditionNo = false;
                this.inspectedCondition = '';
            }else{
                this.isActualConditionYes = false;
            }

        }
        if(fieldname == 'correct_part_yes'){
            if(is_checked) {
                this.isCorrectPartYes = true;
                this.isCorrectPartNo = false;
            }else{
                this.isCorrectPartYes = false;
            }

        }
        if(fieldname == 'correct_part_no'){
            if(is_checked) {
                this.isCorrectPartNo = true;
                this.isCorrectPartYes = false;
            }else{
                this.isCorrectPartNo = false;
            }

        }

        if(fieldname == 'inspected_condition'){
            this.inspectedCondition = event.target.value;
        }
        console.log('xxx isCorrectPartYes '+ this.isCorrectPartYes);
        console.log('xxx isCorrectPartNo'+ this.isCorrectPartNo);*/
    }

    SaveCheckList(recordid,seq_no){
        console.log('Save checklist');
        console.log(recordid);
        console.log(seq_no);
        var params = {
            recordid: recordid,
            seq_no: seq_no,
            /*isCorrectPartNo: this.isCorrectPartNo,
            isCorrectPartYes: this.isCorrectPartYes,
            inspectedCondition: this.inspectedCondition,
            isActualConditionYes: this.isActualConditionYes,
            isActualConditionNo: this.isActualConditionNo,*/
        }
        this.apiRequestService.post(this.apiRequestService.ENDPOINT_SAVE_CHECKLIST, params).subscribe(response => {
            console.log(response);
            Swal.fire(response.body.message);
            this.modalCtrl.dismiss();
        },  error => {
            Swal.fire('Can not connect to Server.');
        });
    }
    closeModal() {
        this.modalCtrl.dismiss();
    }


}