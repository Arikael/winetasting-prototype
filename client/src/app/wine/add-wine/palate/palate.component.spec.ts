import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalateComponent } from './palate.component';

describe('PalateComponent', () => {
  let component: PalateComponent;
  let fixture: ComponentFixture<PalateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
