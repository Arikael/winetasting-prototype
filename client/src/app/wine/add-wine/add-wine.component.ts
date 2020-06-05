import { Component, OnInit } from '@angular/core';
import { WizardStep, WizardConfig } from 'src/app/wizard/wizard-step';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WineApiService } from 'src/app/api/wine-api.service';
import { WineFormModel } from '../models/wine/wine.form-model';
import { WineFormModelFactory } from '../services/wine-form-model-factory';

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.scss'],
})
export class AddWineComponent implements OnInit {

  wizardConfig: WizardConfig;
  wineForm: FormGroup;
  wineModel: WineFormModel = null;

  constructor(private formBuilder: FormBuilder) {
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
    this.wineForm = formBuilder.group({
      base: formBuilder.group({
        name: formBuilder.control('TEST'),
        year: formBuilder.control('2019'),
        producer: formBuilder.control(''),
        tastedOn: formBuilder.control(new Date()),
        grapes: formBuilder.control([])
      })
    });
  }

  ngOnInit() {
    this.wineForm.patchValue(new WineFormModelFactory().createWineFormModel());
  }
}
