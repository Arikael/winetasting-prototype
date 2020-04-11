import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWineComponent } from './edit-wine/add-wine.component';
import { WineRoutingModule } from './wine-routing.module';
import { IonicModule } from '@ionic/angular';
import { BaseDataComponent } from './base-data/base-data.component';

@NgModule({
  declarations: [
    AddWineComponent,
    BaseDataComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    WineRoutingModule
  ]
})
export class WineModule { }
