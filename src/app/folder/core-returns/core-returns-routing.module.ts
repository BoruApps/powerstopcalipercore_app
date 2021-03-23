import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreReturnsPage } from './core-returns.page';

const routes: Routes = [
  {
    path: '',
    component: CoreReturnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreReturnsPageRoutingModule {}
