import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWineComponent } from './add-wine.component';

describe('AddWineComponent', () => {
  let component: AddWineComponent;
  let fixture: ComponentFixture<AddWineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
