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
    // tslint:disable-next-line:variable-name
    private _currentStepSubject$: BehaviorSubject<WizardStep> = new BehaviorSubject<WizardStep>(new WizardStep());

    constructor(private router: Router) {
    }

    get currentStep(): Observable<WizardStep> {
        return this._currentStepSubject$;
    }

    get allSteps(): WizardStep[] {
        return this.steps.slice(0);
    }

    isStepCurrent(step: WizardStep | string): Observable<boolean> {
        const id = typeof step === 'string' ? step : step.id;

        return this.currentStep.pipe(
            take(1),
            map((cStep: WizardStep) => {
                if (!cStep) {
                    return false;
                }

                return id === cStep.id;
            })
        );
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
    }

    createStepsAndSetCurrentStep(steps: WizardStep[], currentStep: WizardStep | string): Observable<WizardStepResult> {
        this.createSteps(steps);
        return this.setCurrentStep(currentStep);
    }

    setCurrentStep(step: WizardStep | string): Observable<WizardStepResult> {
        let id: string = null;

        if (typeof step === 'string') {
            id = step;
        } else {
            id = step.id;
        }

        const foundStep = this.findStep(id);
        const stepFound$ = defer(() => this.router.navigateByUrl(foundStep.link)
            .then(response => response)
            .catch((error: any) => {
                console.error(error);

                return false;
            })).pipe(
                map((result: boolean) => {
                    return {
                        result,
                        step: foundStep
                    };
                }),
                tap((result: WizardStepResult) => {
                    if (result.result) {
                        this._currentStepSubject$.next(foundStep);
                    }
                })
            );

        const stepNotFound$ = of({
            result: false,
            step: foundStep ? foundStep : null
        });

        return this.currentStep.pipe(
            take(1),
            mergeMap((cStep: WizardStep) => {
                return iif(() => foundStep && (cStep && cStep.id !== foundStep.id || !cStep),
                    stepFound$,
                    stepNotFound$.pipe(map((notFound: WizardStepResult) => {
                        if (!notFound.step) {
                            notFound.step = cStep;
                        }

                        return notFound;
                    }))
                );
            })
        );
    }

    forward(): Observable<WizardStepResult> {
        return this.moveStep('forward');
    }

    back(): Observable<WizardStepResult> {
        return this.moveStep('back');
    }

    private moveStep(direction: 'forward' | 'back'): Observable<WizardStepResult> {
        return this.findCurrentStepIndex().pipe(
            mergeMap((currentIndex: number) => {
                const forwardValid = direction === 'forward' && currentIndex < this.steps.length - 1 && currentIndex > -1;
                const backValid = direction === 'back' && currentIndex > 0;
                const indexChange = direction === 'forward' ? 1 : -1;

                if (forwardValid || backValid) {
                    return this.setCurrentStep(this.steps[currentIndex + indexChange]);
                } else if (currentIndex === -1) {
                    return this.setCurrentStep(this.steps[0]);
                }

                return this.currentStep.pipe(
                    take(1),
                    map((step: WizardStep) => {
                        return {
                            result: false,
                            step
                        };
                    })
                );
            })
        );
    }

    private findStep(id: string): WizardStep {
        const step = this.steps.find((item) => item.id === id);

        return step;
    }

    private findCurrentStepIndex(): Observable<number> {
        return this.currentStep.pipe(
            take(1),
            map((step: WizardStep) => {
                return step ? this.steps.findIndex((item) => item.id === step.id) : -1;
            })
        );
    }
}
