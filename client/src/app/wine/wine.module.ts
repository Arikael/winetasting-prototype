import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWineComponent } from './add-wine/add-wine.component';
import { WineRoutingModule } from './wine-routing.module';
import { IonicModule } from '@ionic/angular';
import { BaseDataComponent } from './base-data/base-data.component';
import { WizardStepperComponent } from '../wizard/wizard-stepper/wizard-stepper.component';

@NgModule({
  declarations: [
    AddWineComponent,
    BaseDataComponent,
    WizardStepperComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    WineRoutingModule
  ]
})
export class WineModule { }
