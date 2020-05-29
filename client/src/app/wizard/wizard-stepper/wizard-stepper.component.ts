import { Component, OnInit, Input } from '@angular/core';
import { WizardStep, WizardConfig } from '../wizard-step';

@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss'],
})
export class WizardStepperComponent implements OnInit {

  @Input() config: WizardConfig = {
    steps: [],
    selectedStep: null
  };

  constructor() {

  }

  ngOnInit() {

  }

  setStep(stepKey: string) {
    const step = this.config.steps.find(x => x.key === stepKey);

    if (step) {
      this.config.selectedStep = step;
    }

  }

  forward() {
    const currentStep = this.getCurrentStepIndex();

    if (currentStep < this.config.steps.length) {
      this.config.selectedStep = this.config.steps[currentStep + 1];
    }
  }

  back() {
    const currentStep = this.getCurrentStepIndex();

    if (currentStep > 0) {
      this.config.selectedStep = this.config.steps[currentStep - 1];
    }
  }

  private getCurrentStepIndex(): number {
    return this.config.selectedStep
      ? this.config.steps.findIndex(x => x.key === this.config.selectedStep.key)
      : 0;
  }
}
