import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerReturnsPageRoutingModule } from './customer-returns-routing.module';

import { CustomerReturnsPage } from './customer-returns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerReturnsPageRoutingModule
  ],
  declarations: [CustomerReturnsPage]
})
export class CustomerReturnsPageModule {}
