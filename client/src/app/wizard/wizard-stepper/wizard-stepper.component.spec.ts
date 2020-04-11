import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WizardStepperComponent } from './wizard-stepper.component';
import { WizardService } from '../wizard.service';

describe('WizardStepperComponent', () => {
  let component: WizardStepperComponent;
  let fixture: ComponentFixture<WizardStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardStepperComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        WizardService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
