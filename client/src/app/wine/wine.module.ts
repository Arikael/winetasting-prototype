import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWineComponent } from './add-wine/add-wine.component';
import { WineRoutingModule } from './wine-routing.module';
import { IonicModule } from '@ionic/angular';
import { WizardStepperComponent } from '../wizard/wizard-stepper/wizard-stepper.component';
import { TastesComponent } from './shared/tastes/tastes.component';
import { GrapesSelectionComponent } from './shared/grapes-selection/grapes-selection.component';
import { BaseDataComponent } from './add-wine/base-data/base-data.component';
import { SummaryComponent } from './add-wine/summary/summary.component';

@NgModule({
  declarations: [
    AddWineComponent,
    BaseDataComponent,
    WizardStepperComponent,
    TastesComponent,
    SummaryComponent,
    GrapesSelectionComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    WineRoutingModule
  ]
})
export class WineModule { }
