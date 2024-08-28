import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPPageRoutingModule } from './detalles-p-routing.module';
import { DetallesPComponent } from './detalles-p.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPPageRoutingModule
  ],
  declarations: [DetallesPComponent]
})
export class DetallesPPageModule { }
