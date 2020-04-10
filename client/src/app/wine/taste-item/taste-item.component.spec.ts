import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasteItemComponent } from './taste-item.component';

describe('TasteItemComponent', () => {
  let component: TasteItemComponent;
  let fixture: ComponentFixture<TasteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasteItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
