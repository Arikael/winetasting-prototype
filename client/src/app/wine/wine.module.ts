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
import { TranslocoRootModule } from '../transloco-root.module';
import { TasteCategoryComponent } from './shared/taste-category/taste-category.component';
import { PalateComponent } from './add-wine/palate/palate.component';
import { NoseComponent } from './add-wine/nose/nose.component';
import { TasteItemComponent } from './shared/taste-item/taste-item.component';
import { TasteItemDetailComponent } from './shared/taste-item/taste-item-detail.component';

@NgModule({
  declarations: [
    AddWineComponent,
    BaseDataComponent,
    WizardStepperComponent,
    TastesComponent,
    TasteCategoryComponent,
    TasteItemComponent,
    TasteItemDetailComponent,
    SummaryComponent,
    NoseComponent,
    PalateComponent,
    GrapesSelectionComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    WineRoutingModule,
    TranslocoRootModule
  ]
})
export class WineModule { }
