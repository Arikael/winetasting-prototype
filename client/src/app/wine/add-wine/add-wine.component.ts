import { Component, OnInit } from '@angular/core';
import { WizardStep, WizardConfig } from 'src/app/wizard/wizard-step';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WineApiService } from 'src/app/api/wine-api.service';
import { WineFormModel } from '../models/wine/wine.form-model';
import { WineFormModelFactory } from '../services/wine-form-model-factory';
import { FormService } from 'src/app/core/form.service';
import { WineFormService } from '../services/wine-form.service';
import { FormModelFactory } from '../services/form-model-factory';
import { WineFormSubmitMediator } from '../services/wine-form-submit.mediator';

export function formServiceFactory(formBuilder: FormBuilder, modelFactory: FormModelFactory) {
  return new WineFormService(formBuilder, modelFactory.createWineFormModel());
}

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.scss'],
  providers: [
    {
      provide: FormService,
      useFactory: formServiceFactory,
      deps: [FormBuilder, FormModelFactory]
    },
    {
      provide: FormModelFactory,
      useClass: WineFormModelFactory
    },
    WineFormSubmitMediator
  ]
})
export class AddWineComponent implements OnInit {

  wizardConfig: WizardConfig;
  wineForm: FormGroup;
  wineModel: WineFormModel = null;

  constructor(private formService: FormService<WineFormModel>, private wineFormSubmit: WineFormSubmitMediator) {
    const steps = [
      {
        key: 'base',
        icon: 'document-outline'
      },
      {
        key: 'nose',
        icon: 'nutrition-outline'
      },
      {
        key: 'mouth',
        icon: 'restaurant-outline'
      },
      {
        key: 'rating',
        icon: 'star-half'
      }
    ];

    this.wizardConfig = WizardConfig.create(steps);
    this.wineForm = formService.getForm();
  }

  ngOnInit() {
  }

  saveWine() {
    this.wineFormSubmit.action();
  }
}
