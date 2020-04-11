import { Observable, of, Subject } from 'rxjs';
import { WineWizardStep } from './wine-wizard-step';

export class WineWizardService {
    private steps: WineWizardStep[];
    // tslint:disable-next-line:variable-name
    private _currentStep: WineWizardStep;
    private stepChange$: Subject<WineWizardStep> = new Subject<WineWizardStep>();

    get currentStep(): WineWizardStep {
        return this._currentStep;
    }

    get allSteps(): WineWizardStep[] {
        return this.steps.slice(0);
    }

    onStepChanged(): Observable<WineWizardStep> {
        return of(null);
    }

    addSteps(steps: WineWizardStep | WineWizardStep[]) {
        const stepsAsArray = Array.isArray(steps)
            ? steps
            : [steps];

        const stepsToAdd = stepsAsArray.map(item => Object.assign({}, item));
        this.steps.push(...stepsToAdd);
    }

    createSteps(steps: WineWizardStep[]) {
        // always create new steps, so they can't be mutated from outside
        this.steps = [];
        this.addSteps(steps);
        this.setStep(this.steps[0]);
    }

    setStep(step: WineWizardStep | string): boolean {
        let id: string = null;
        if (typeof step === 'string') {
            id = step;
        } else {
            id = step.id;
        }

        const foundStep = this.findStep(id);

        if (foundStep) {
            this._currentStep = foundStep;

            return true;
        }

        return false;
    }

    forward(): WineWizardStep {
        const currentIndex = this.findCurrentStepIndex();

        if (currentIndex < this.steps.length - 1) {
            this.setStep(this.steps[currentIndex + 1]);
        }

        return this._currentStep;
    }

    back(): WineWizardStep {
        const currentIndex = this.findCurrentStepIndex();

        if (currentIndex > 0) {
            this.setStep(this.steps[currentIndex - 1]);
        }

        return this._currentStep;
    }

    private findStep(id: string): WineWizardStep {
        const step = this.steps.find((item) => item.id === id);

        return step;
    }

    private findCurrentStepIndex() {
        return this.steps.findIndex((item) => item.id === this._currentStep.id);
    }
}
