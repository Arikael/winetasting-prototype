import { Observable, of, Subject } from 'rxjs';
import { WizardStep } from './wizard-step';

export class WizardService {
    private steps: WizardStep[];
    // tslint:disable-next-line:variable-name
    private _currentStep: WizardStep;
    private stepChange$: Subject<WizardStep> = new Subject<WizardStep>();

    get currentStep(): WizardStep {
        return this._currentStep;
    }

    get allSteps(): WizardStep[] {
        return this.steps.slice(0);
    }

    get onStepChanged(): Observable<WizardStep> {
        return this.stepChange$;
    }

    addSteps(steps: WizardStep | WizardStep[]) {
        const stepsAsArray = Array.isArray(steps)
            ? steps
            : [steps];

        const stepsToAdd = stepsAsArray.map(item => Object.assign({}, item));
        this.steps.push(...stepsToAdd);
    }

    createSteps(steps: WizardStep[]) {
        // always create new steps, so they can't be mutated from outside
        this.steps = [];
        this.addSteps(steps);
        this.setStep(this.steps[0]);
    }

    setStep(step: WizardStep | string): boolean {
        let id: string = null;

        if (typeof step === 'string') {
            id = step;
        } else {
            id = step.id;
        }

        const foundStep = this.findStep(id);
        const stepsAreIdentical = foundStep && this._currentStep && this._currentStep.id === foundStep.id;

        // needs proper test
        if (foundStep && !stepsAreIdentical) {
            this._currentStep = foundStep;
            this.stepChange$.next(this._currentStep);

            return true;
        }

        return false;
    }

    forward(): WizardStep {
        const currentIndex = this.findCurrentStepIndex();

        if (currentIndex < this.steps.length - 1) {
            this.setStep(this.steps[currentIndex + 1]);
        }

        return this._currentStep;
    }

    back(): WizardStep {
        const currentIndex = this.findCurrentStepIndex();

        if (currentIndex > 0) {
            this.setStep(this.steps[currentIndex - 1]);
        }

        return this._currentStep;
    }

    private findStep(id: string): WizardStep {
        const step = this.steps.find((item) => item.id === id);

        return step;
    }

    private findCurrentStepIndex() {
        return this.steps.findIndex((item) => item.id === this._currentStep.id);
    }
}
