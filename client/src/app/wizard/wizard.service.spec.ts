import { WizardService } from './wizard.service';
import { WizardStep } from './wizard-step';
import { async } from '@angular/core/testing';

describe('Wizard Service', () => {
    let service: WizardService;
    let steps: WizardStep[];

    beforeEach(() => {
        service = new WizardService();
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

    it('creating steps sets first step as current', () => {
        service.createSteps(steps);
        expect(service.currentStep.id).toEqual(steps[0].id);
    });

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

    it('going forward sets the next step', () => {
        service.createSteps(steps);
        const allSteps = service.allSteps;
        const newStep = service.forward();
        expect(allSteps.findIndex((item) => item.id === newStep.id)).toEqual(1);
    });

    it('going forward if on last step stays on last step', () => {
        service.createSteps(steps);
        service.setCurrentStep(steps[steps.length - 1]);
        const newStep = service.forward();
        expect(newStep.id).toEqual(steps[steps.length - 1].id);
    });

    it('going back sets the previous step', () => {
        service.createSteps(steps);
        service.setCurrentStep(steps[1]);
        const newStep = service.back();
        expect(newStep.id).toEqual(steps[0].id);
    });

    it('going back on first step stays on first step', () => {
        service.createSteps(steps);
        const newStep = service.back();
        expect(newStep.id).toEqual(steps[0].id);
    });

    it('setting a step sets the current step', () => {
        service.createSteps(steps);
        service.setCurrentStep(steps[1]);
        expect(service.currentStep.id).toEqual(steps[1].id);
    });

    it('setting a known step returns true', () => {
        service.createSteps(steps);
        expect(service.setCurrentStep(steps[1])).toBeTruthy();
    });

    it('setting an unknown step returns false', () => {
        service.createSteps(steps);
        expect(service.setCurrentStep('unknown')).toBeFalsy();
    });

    it('setting an unknown step doesnt set the current step', () => {
        service.createSteps(steps);
        const currentStepId = service.currentStep.id;
        service.setCurrentStep('unkown');
        expect(service.currentStep.id).toEqual(currentStepId);
    });

    it('setting a step emits the onStepChange event', async(() => {
        service.createSteps(steps);
        service.onStepChanged.subscribe((step: WizardStep) => {
            expect(step).toBeDefined();
        });

        service.setCurrentStep('2');
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

    it('adding steps emits ', () => {
        service.createSteps(steps);
        service.addSteps(createNewStep());
        service.createSteps(steps);
        expect(service.allSteps.length).toEqual(steps.length);
    });

    it('identical string id returns true on isStepCurent', () => {
        service.createSteps(steps);
        expect(service.isStepCurrent('1')).toBeTruthy();
    });

    it('different string id returns true on isStepCurent', () => {
        service.createSteps(steps);
        expect(service.isStepCurrent('2')).toBeFalsy();
    });

    it('identical step returns true on isStepCurent', () => {
        service.createSteps(steps);
        expect(service.isStepCurrent( {
            id: '1',
            icon: '',
            link: ''
        })).toBeTruthy();
    });

    it('different step returns false on isStepCurent', () => {
        service.createSteps(steps);
        expect(service.isStepCurrent( {
            id: '2',
            icon: '',
            link: ''
        })).toBeFalsy();
    });

    function createNewStep(): WizardStep {
        return {
            id: (steps.length + 1).toString(),
            icon: 'icon',
            link: 'link'
        };
    }
});
