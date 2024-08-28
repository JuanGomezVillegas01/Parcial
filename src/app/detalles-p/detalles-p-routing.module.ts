import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPComponent } from './detalles-p.component';

const routes: Routes = [
  {
    path: '',
    component: DetallesPComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPPageRoutingModule {}
