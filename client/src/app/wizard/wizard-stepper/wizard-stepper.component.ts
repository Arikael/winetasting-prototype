import { Component, OnInit, Input } from '@angular/core';
import { WizardService } from '../wizard.service';
import { WizardStep } from '../wizard-step';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-wizard-stepper',
  templateUrl: './wizard-stepper.component.html',
  styleUrls: ['./wizard-stepper.component.scss'],
})
export class WizardStepperComponent implements OnInit {
  constructor(private router: Router, private wizardService: WizardService) { }

  get wizardSteps(): WizardStep[] {
    return this.wizardService.allSteps;
  }

  ngOnInit() {

  }

  setStep(step: WizardStep) {
    this.wizardService.setCurrentStep(step);
  }

  forward() {
    this.wizardService.forward();
  }

  back() {
    this.wizardService.back();
  }
}
