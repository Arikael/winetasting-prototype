import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TastesComponent } from './tastes.component';

describe('TastesComponent', () => {
  let component: TastesComponent;
  let fixture: ComponentFixture<TastesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TastesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
