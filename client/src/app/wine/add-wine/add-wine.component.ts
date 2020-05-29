import { Component, OnInit } from '@angular/core';
import { WizardStep, WizardConfig } from 'src/app/wizard/wizard-step';

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.scss'],
})
export class AddWineComponent implements OnInit {

  wizardConfig: WizardConfig;
  /**
   *
   */
  constructor() {
    const steps = [
      {
        key: 'base',
        icon: 'document-outline',
        link: '/wine/add/base'
      },
      {
        key: 'nose',
        icon: 'nutrition-outline',
        link: '/wine/add/nose'
      },
      {
        key: 'mouth',
        icon: 'restaurant-outline',
        link: '/wine/add/taste'
      },
      {
        key: 'rating',
        icon: 'star-half',
        link: '/wine/add/summary'
      }
    ];

    this.wizardConfig = WizardConfig.create(steps);
  }

  ngOnInit() { }
}
