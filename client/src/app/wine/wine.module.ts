import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWineComponent } from './add-wine/add-wine.component';
import { WineRoutingModule } from './wine-routing.module';

@NgModule({
  declarations: [
    AddWineComponent
  ],
  imports: [
    CommonModule,
    WineRoutingModule
  ]
})
export class WineModule { }
