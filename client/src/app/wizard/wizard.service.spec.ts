import { WizardService } from './wizard.service';
import { WizardStep } from './wizard-step';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { WizardStepResult } from './wizard-step-result';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

fdescribe('Wizard Service', () => {
    let service: WizardService;
    let steps: WizardStep[];
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(async () => {
        /*routerSpy.navigateByUrl = () => {
            return of(true).toPromise();
        };*/
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: WizardService,
                    deps: [Router]
                },
                {
                    provide: Router,
                    useValue: routerSpy
                }
            ]
        });

        service = TestBed.inject<WizardService>(WizardService);

        steps = [{
            id: '1',
            icon: 'myicon',
            link: 'link1'
        },
        {
            id: '2',
            icon: 'myicon2',
            link: 'link2'
        },
        {
            id: '3',
            icon: 'myicon3',
            link: 'link3'
        }
        ];
    });

    it('creating steps clones steps', () => {
        service.createSteps(steps);
        steps[0].id = 'new';

        const allSteps = service.allSteps;
        expect(steps[0].id).not.toEqual(allSteps[0].id);
    });

    it('after creating steps, current step is still undefined', async(() => {
        service.createSteps(steps);
        service.currentStep.subscribe((step: WizardStep) => {
            expect(step.id).toBeUndefined();
        });
    }));

    it('creating and setting steps, sets currentstep to first step', async(() => {
        setUpRouterSpy();
        service.createStepsAndSetCurrentStep(steps, steps[0]).pipe(
            mergeMap(() => service.currentStep)
        ).subscribe((step: WizardStep) => {
            expect(step.id).toEqual(steps[0].id);
        });
    }));

    it('adding single step clones step', () => {
        service.createSteps(steps);
        const newStep = createNewStep();

        service.addSteps(newStep);
        newStep.id = 'new';
        const allSteps = service.allSteps;

        expect(newStep.id).not.toEqual(allSteps[allSteps.length - 1].id);
    });

    it('adding multiple steps adds all steps', () => {
        service.createSteps(steps);
        const newSteps = [
            {
                ...createNewStep()
            },
            {
                ...createNewStep()
            }
        ];

        service.addSteps(newSteps);
        expect(service.allSteps.length).toEqual(steps.length + newSteps.length);
    });

    it('going forward after creating steps, sets the first step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        const allSteps = service.allSteps;
        service.forward().subscribe((newStep: WizardStepResult) => {
            expect(allSteps[0].id).toEqual(newStep.step.id);
        });
    }));

    it('going forward sets the next step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.forward().pipe(mergeMap((newStep: WizardStepResult) => {
            return service.forward();
        })).subscribe((newStep: WizardStepResult) => {
            expect(steps[1].id).toEqual(newStep.step.id);
        });
    }));

    it('going forward if on last step stays on last step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep(steps[steps.length - 1]).pipe(
            mergeMap(() => service.forward())
        ).subscribe((newStep: WizardStepResult) => {
            expect(newStep.step.id).toEqual(steps[steps.length - 1].id);
        });
    }));

    it('going back sets the previous step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep(steps[1]).pipe(
            mergeMap(() => service.back())
        ).subscribe((newStep: WizardStepResult) => {
            expect(newStep.step.id).toEqual(steps[0].id);
        });
    }));

    it('going back after creating steps sets current step to first step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.back().subscribe((newStep: WizardStepResult) => {
            expect(newStep.step.id).toEqual(steps[0].id);
        });
    }));

    it('going back on first step stays on first step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep('1').pipe(
            mergeMap(() => service.back())
        ).subscribe((newStep: WizardStepResult) => {
            expect(newStep.step.id).toEqual(steps[0].id);
        });
    }));

    it('setting a step sets the current step', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep(steps[1]).subscribe((stepResult: WizardStepResult) => {
            expect(stepResult.step.id).toEqual(steps[1].id);
        });
    }));

    it('setting a known step returns true', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep(steps[1]).subscribe((stepResult: WizardStepResult) => {
            expect(stepResult.result).toBeTruthy();
        });
    }));

    it('setting the same id as current step to current step doesnt emit currentStep subject', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep(steps[1]).subscribe((stepResult: WizardStepResult) => {
            expect(stepResult.result).toBeTruthy();
        });
    }));

    it('setting an unknown step returns false', async(() => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.setCurrentStep('unknown').subscribe((step: WizardStepResult) => {
            expect(step.result).toBeFalsy();
        });
    }));

    it('setting an unknown step doesnt set the current step', async(() => {
        setUpRouterSpy();
        const currentStepId = steps[0].id;
        service.createStepsAndSetCurrentStep(steps, steps[0]).pipe(
            mergeMap(() => service.setCurrentStep('unkown'))
        ).subscribe((step: WizardStepResult) => {
            expect(step.step.id).toEqual(currentStepId);
        });
    }));

    /*xit('setting a step doesnt emit onStepChange event if step has not changed', marbles(m => {
        service.createSteps(steps);
        const subscription = service.onStepChanged.subscribe();
        const expected = m.cold('-^-!');
        service.setStep('2');
        m.expect(subscription).toBeObservable(expected);
        subscription.unsubscribe();
    }));*/

    it('creating steps resets the current step', () => {
        service.createSteps(steps);
        service.addSteps(createNewStep());
        service.createSteps(steps);
        expect(service.allSteps.length).toEqual(steps.length);
    });

    xit('adding steps emits ', () => {
        service.createSteps(steps);
        service.addSteps(createNewStep());
        service.createSteps(steps);
        expect(service.allSteps.length).toEqual(steps.length);
    });

    it('identical string id returns true on isStepCurent', async(() => {
        setUpRouterSpy();
        service.createStepsAndSetCurrentStep(steps, steps[1]).pipe(
            mergeMap(() => service.isStepCurrent('2'))
        ).subscribe((isCurrent: boolean) => expect(isCurrent).toBeTruthy());

    }));

    it('different string id returns false on isStepCurent', () => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.isStepCurrent('2').subscribe((isCurrent: boolean) => expect(isCurrent).toBeFalsy());
    });

    it('identical step returns true on isStepCurent', async(() => {
        setUpRouterSpy();
        service.createStepsAndSetCurrentStep(steps, steps[0]).pipe(
            mergeMap(() => {
                return service.isStepCurrent({
                    id: '1',
                    icon: '',
                    link: ''
                });
            })
        ).subscribe((isCurrent: boolean) => expect(isCurrent).toBeTruthy());
    }));

    it('different step returns false on isStepCurent', () => {
        setUpRouterSpy();
        service.createSteps(steps);
        service.isStepCurrent({
            id: '2',
            icon: '',
            link: ''
        }).subscribe((isCurrent: boolean) => expect(isCurrent).toBeFalsy());
    });

    function createNewStep(): WizardStep {
        return {
            id: (steps.length + 1).toString(),
            icon: 'icon',
            link: 'link'
        };
    }

    function setUpRouterSpy() {
        routerSpy.navigateByUrl.and.callFake(() => Promise.resolve(true));
    }
});
