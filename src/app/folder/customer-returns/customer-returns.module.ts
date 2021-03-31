import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerReturnsPageRoutingModule } from './customer-returns-routing.module';

import { CustomerReturnsPage } from './customer-returns.page';
import {ChecklistModalPage} from './checklist-modal/checklist-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerReturnsPageRoutingModule
  ],
  declarations: [CustomerReturnsPage,ChecklistModalPage],
  entryComponents: [ChecklistModalPage]
})
export class CustomerReturnsPageModule {}
