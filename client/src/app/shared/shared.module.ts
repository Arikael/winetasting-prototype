import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list/chip-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { WizardStep } from '../wizard/wizard-step';
import { WizardStepComponent } from '../wizard/wizard-step.component';
import { WizardComponent } from '../wizard/wizard.component';
import { WizardStepperComponent } from '../wizard/wizard-stepper/wizard-stepper.component';



@NgModule({
  declarations: [
    ChipListComponent,
    WizardComponent,
    WizardStepComponent,
    WizardStepperComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslocoModule,
  ],
  exports: [
    ChipListComponent,
    WizardComponent,
    WizardStepComponent,
    WizardStepperComponent
  ]
})
export class SharedModule { }
