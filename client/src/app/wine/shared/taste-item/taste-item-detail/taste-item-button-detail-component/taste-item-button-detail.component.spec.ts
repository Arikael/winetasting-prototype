import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasteItemButtonDetailComponent } from './taste-item-button-detail.component';

describe('TasteItemButtonDetailComponent', () => {
  let component: TasteItemButtonDetailComponent;
  let fixture: ComponentFixture<TasteItemButtonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasteItemButtonDetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasteItemButtonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
