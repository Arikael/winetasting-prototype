import { TestBed } from '@angular/core/testing';
import { WizardService } from './wizard.service';
import { WizardStep } from './wizard-step';
import { Router } from '@angular/router';
import { url } from 'inspector';

fdescribe('Wizard Service', () => {
    let service: WizardService;
    let steps: WizardStep[];
    const routerMock = {
        navigateByUrl: (url: string) => { },
        url: ''
    } as jasmine.SpyObj<Router>;

    Object.defineProperty(routerMock, 'url', {
        configurable: true,
        get: () => ''
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: WizardService,
                    deps: [Router]
                },
                {
                    provide: Router,
                    useValue: routerMock
                }
            ]
        });

        service = TestBed.inject<WizardService>(WizardService);

        steps = [{
            icon: 'myicon',
            link: 'link1'
        },
        {
            icon: 'myicon2',
            link: 'link2'
        },
        {
            icon: 'myicon3',
            link: 'link3'
        }
        ];
    });

    it('creating steps clones steps', () => {
        service.createSteps(steps);
        steps[0].link = 'new';
        const allSteps = service.allSteps;

        expect(steps[0].link).not.toEqual(allSteps[0].link);
    });

    it('if steps havent been created, setCurrentStep throws an error', () => {
        expect(() => service.setCurrentStep(steps[0])).toThrow();
    });

    it('if steps havent been created, forward throws an error', () => {
        expect(() => service.forward()).toThrow();
    });

    it('if steps havent been created, back throws an error', () => {
        expect(() => service.back()).toThrow();
    });

    it('no navigation occurs on creating steps', () => {
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[0].link);
        const spy = spyOn(routerMock, 'navigateByUrl');

        service.createSteps(steps);

        expect(spy).not.toHaveBeenCalled();
    });

    it('if the current route matches, current step will be the current route after creating steps', () => {
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[0].link);

        service.createSteps(steps);

        expect(service.currentStep.link).toEqual(steps[0].link);
    });

    it('if no route matches any step after creating steps, the current step is undefined', () => {
        service.createSteps(steps);
        steps[0].link = 'new';

        expect(service.currentStep).toBeUndefined();
    });

    it('setting an unkown step, doesnt trigger navigation', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');

        service.createSteps(steps);

        expect(() => service.setCurrentStep('unkown')).toThrow();
    });

    it('setting step, sets current step', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');

        service.createSteps(steps);
        service.setCurrentStep(steps[1]);

        expect(spy).toHaveBeenCalledWith(steps[1].link);
    });

    it('forward moves step one step forward', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');
        service.createSteps(steps);
        service.setCurrentStep(steps[0]);

        service.setCurrentStep(steps[1]);

        const navArgs = spy.calls.mostRecent().args[0];
        expect(navArgs).toEqual(steps[1].link);
    });

    it('forward stays if already on last step', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');
        service.createSteps(steps);
        service.setCurrentStep(steps[steps.length - 1]);
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[steps.length - 1].link);

        service.forward();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('back moves step one step back', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');
        service.createSteps(steps);
        service.setCurrentStep(steps[1]);
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[1].link);

        service.back();

        const navArgs = spy.calls.mostRecent().args[0];
        expect(navArgs).toEqual(steps[0].link);
    });

    it('back stays if already on first step', () => {
        const spy = spyOn(routerMock, 'navigateByUrl');
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[0].link);
        service.createSteps(steps);

        service.back();

        expect(spy).not.toHaveBeenCalled();
    });

    it('absolute url matches when searching current step', () => {
        spyOnProperty(routerMock, 'url', 'get').and.returnValue(steps[0].link);
        service.createSteps(steps);

        expect(service.isLinkCurrent(steps[0].link)).toBeTruthy();
    });

    it('if step url matches the end of the routers url, it matches', () => {
        spyOnProperty(routerMock, 'url', 'get').and.returnValue('/this/test/' + steps[0].link);
        service.createSteps(steps);

        expect(service.isLinkCurrent(steps[0].link)).toBeTruthy();
    });

    it('if step url matches in the middle of the routers url, it doesnt match', () => {
        spyOnProperty(routerMock, 'url', 'get').and.returnValue('/this/' + steps[0].link + '/test');
        service.createSteps(steps);

        expect(service.isLinkCurrent(steps[0].link)).toBeFalsy();
    });
});
