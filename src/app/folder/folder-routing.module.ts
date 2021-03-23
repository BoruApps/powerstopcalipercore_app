import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'core-returns',
    loadChildren: () => import('./core-returns/core-returns.module').then( m => m.CoreReturnsPageModule)
  },
  {
    path: 'customer-returns',
    loadChildren: () => import('./customer-returns/customer-returns.module').then( m => m.CustomerReturnsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
