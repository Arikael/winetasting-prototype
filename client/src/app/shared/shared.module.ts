import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list/chip-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [
    ChipListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslocoModule
  ],
  exports: [
    ChipListComponent
  ]
})
export class SharedModule { }
