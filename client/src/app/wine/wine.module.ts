import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWineComponent } from './add-wine/add-wine.component';
import { WineRoutingModule } from './wine-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AddWineComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    WineRoutingModule
  ]
})
export class WineModule { }
