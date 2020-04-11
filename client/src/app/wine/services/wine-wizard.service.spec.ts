import { WineWizardService } from './wine-wizard.service';
import { WineWizardStep } from './wine-wizard-step';
import { connectorSeviceFactory } from 'src/app/factories/factories';

describe('WineWizard Service', () => {
    let service: WineWizardService;
    let steps: WineWizardStep[];

    beforeEach(() => {
        service = new WineWizardService();
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
        service.setStep(steps[steps.length - 1]);
        const newStep = service.forward();
        expect(newStep.id).toEqual(steps[steps.length - 1].id);
    });

    it('going back sets the previous step', () => {
        service.createSteps(steps);
        service.setStep(steps[1]);
        const newStep = service.back();
        expect(newStep.id).toEqual(steps[0].id);
    });

    it('going back on first step stays on first step', () => {
        service.createSteps(steps);
        service.back();

    });

    it('setting a step sets the current step', () => {
        service.createSteps(steps);
        service.setStep(steps[1]);
        expect(service.currentStep.id).toEqual(steps[1].id);
    });

    it('setting a known step returns true', () => {
        service.createSteps(steps);
        expect(service.setStep(steps[1])).toBeTruthy();
    });

    it('setting an unknown step returns false', () => {
        service.createSteps(steps);
        expect(service.setStep('unknown')).toBeFalsy();
    });

    it('setting an unknown step doesnt set the current step', () => {
        service.createSteps(steps);
        const currentStepId = service.currentStep.id;
        service.setStep('unkown');
        expect(service.currentStep.id).toEqual(currentStepId);
    });

    it('setting a step emits the onStepChange event', () => {

    });

    it('creating steps resets the current step', () => {
        service.createSteps(steps);
        service.addSteps(createNewStep());
        service.createSteps(steps);
        expect(service.allSteps.length).toEqual(steps.length);
    });


    function createNewStep(): WineWizardStep {
        return {
            id: (steps.length + 1).toString(),
            icon: 'icon',
            link: 'link'
        };
    }
});
