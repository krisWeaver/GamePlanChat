import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostPasswordPage } from './lost-password.page';

const routes: Routes = [
  {
    path: '',
    component: LostPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostPasswordPageRoutingModule {}
