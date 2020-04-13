import { Observable, of, Subject, from, BehaviorSubject, iif, defer } from 'rxjs';
import { tap, filter, map, mergeMap, catchError, distinctUntilChanged, take } from 'rxjs/operators';
import { WizardStep } from './wizard-step';
import { Router } from '@angular/router';
import { WizardStepResult } from './wizard-step-result';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WizardService {
    private steps: WizardStep[];

    get allSteps(): WizardStep[] {
        return this.steps.slice(0);
    }

    get currentStep(): WizardStep {
        return this.getCurrentStep();
    }

    constructor(private router: Router) {
    }

    createSteps(steps: WizardStep[]) {
        // always create new steps, so they can't be mutated from outside
        this.steps = [];
        this.addSteps(steps);
    }

    /*createStepsAndSetCurrentStep(steps: WizardStep[], currentStep: WizardStep) {
        this.createSteps(steps);
        this.setCurrentStep(currentStep);
    }*/

    setCurrentStep(step: WizardStep | string) {
        this.throwIfNoStepsHaveBeenSet();
        const link = this.getLinkFromStep(step);

        if (!this.stepExists(link)) {
            throw Error(`step ${link} doesnt exist`);
        }

        if (!this.isStepCurrent(step)) {
            this.router.navigateByUrl(link);
        }
    }

    forward() {
        this.throwIfNoStepsHaveBeenSet();
        const currentIndex = this.getIndexOfCurrentStep();

        if (currentIndex < this.allSteps.length - 1) {
            this.setCurrentStep(this.allSteps[currentIndex + 1]);
        }
    }

    back() {
        this.throwIfNoStepsHaveBeenSet();
        const currentIndex = this.getIndexOfCurrentStep();

        if (currentIndex > 0) {
            this.setCurrentStep(this.allSteps[currentIndex - 1].link);
        }
    }

    isStepCurrent(step: WizardStep | string): boolean {
        this.throwIfNoStepsHaveBeenSet();
        const link = this.getLinkFromStep(step);

        return this.isLinkCurrent(link);
    }

    isLinkCurrent(link: string): boolean {
        this.throwIfNoStepsHaveBeenSet();
        return this.router.url.endsWith(link);
    }

    private addSteps(steps: WizardStep | WizardStep[]) {
        const stepsAsArray = Array.isArray(steps)
            ? steps
            : [steps];

        const stepsToAdd = stepsAsArray.map(item => Object.assign({}, item));
        this.steps.push(...stepsToAdd);
    }

    private getLinkFromStep(step: WizardStep | string): string {
        return typeof step === 'string' ? step : step.link;
    }

    private getCurrentStep(): WizardStep {
        return this.allSteps.find((item) => this.isLinkCurrent(item.link));
    }

    private getIndexOfCurrentStep() {
        return this.allSteps.findIndex((item) => this.isLinkCurrent(item.link));
    }

    private stepExists(step: WizardStep | string): boolean {
        const link = this.getLinkFromStep(step);

        return this.allSteps.findIndex((item) => item.link === link) > -1;
    }

    private throwIfNoStepsHaveBeenSet() {
        if (!this.allSteps || this.allSteps.length === 0) {
            throw Error('WizardService: createSteps before navigating');
        }
    }
}
