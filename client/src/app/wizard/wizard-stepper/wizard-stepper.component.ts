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

  setStep(step: WizardStep) {
    this.wizardService.setCurrentStep(step).subscribe();
  }

  forward() {
    this.wizardService.forward().subscribe();
  }

  back() {
    this.wizardService.back().subscribe();
  }
}
