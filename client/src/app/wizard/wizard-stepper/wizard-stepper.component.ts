import { Component, OnInit } from '@angular/core';
import { WizardService } from '../wizard.service';
import { WizardStep } from '../wizard-step';

@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss'],
})
export class WizardStepperComponent implements OnInit {
  constructor(private wizardService: WizardService) { }

  get wizardSteps(): WizardStep[] {
    return this.wizardService.allSteps;
  }

  ngOnInit() {

  }

  forward() {
    this.wizardService.forward();
  }

  back() {
    this.wizardService.back();
  }
}
