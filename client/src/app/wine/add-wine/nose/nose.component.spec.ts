import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoseComponent } from './nose.component';

describe('NoseComponent', () => {
  let component: NoseComponent;
  let fixture: ComponentFixture<NoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
