import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoreReturnsPageRoutingModule } from './core-returns-routing.module';

import { CoreReturnsPage } from './core-returns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreReturnsPageRoutingModule
  ],
  declarations: [CoreReturnsPage]
})
export class CoreReturnsPageModule {}
