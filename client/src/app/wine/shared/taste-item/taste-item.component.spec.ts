import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasteItemComponent } from './taste-item.component';
import { By } from '@angular/platform-browser';

fdescribe('TasteItemComponent', () => {
  let component: TasteItemComponent;
  let fixture: ComponentFixture<TasteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasteItemComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if the provided value doesnt adhere to TasteModel structure, an exceptin is thrown', () => {
    expect(() => component.writeValue({ test: 'test' })).toThrowError();
  });

  function prepareForTogglingSelectState(state: boolean) {
    component.writeValue({
      tasteKey: 'key',
      isSelected: state
    });
    const tasteElement = fixture.debugElement.query(By.css('.taste'));

    tasteElement.triggerEventHandler('click', null);
    fixture.detectChanges();
  }

  it('if not yet selected, single tap will set the appropriate css class', () => {
    component.writeValue({
      tasteKey: 'key',
      isSelected: false
    });
    const tasteElement = fixture.debugElement.query(By.css('.taste'));

    tasteElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(tasteElement.classes.selected).toBeTruthy();
  });

  it('if not yet selected, single tap set the components value as selected', () => {
    const value = {
      tasteKey: 'key',
      isSelected: false
    };
    component.writeValue(value);
    component.ngAfterViewInit();
    const tasteElement = fixture.debugElement.query(By.css('.taste'));

    tasteElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(value.isSelected).toBeTruthy();
  });

  it('if selected, single tap removes the appropriate css class', () => {
    const value = {
      tasteKey: 'key',
      isSelected: true
    };
    component.writeValue(value);
    const tasteElement = fixture.debugElement.query(By.css('.taste'));

    tasteElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(tasteElement.classes.selected).toBeFalsy();
  });

  it('on double tap, the details of the taste are shown', () => {
    const tasteElement = fixture.debugElement.query(By.css('.taste'));

    tasteElement.triggerEventHandler('click', null);
    tasteElement.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(true).toBeFalse();
  });

  it('on double tap, selected state is not changed', () => {
    expect(true).toBeFalse();
  });

  it('tapping uneven times but more than 2 times will, be handled as selecting/deselecting', () => {
    expect(true).toBeFalse();
  });

  it('tapping even times but more than 2 times will, be handled as opening details', () => {
    expect(true).toBeFalse();
  });

  it('when selecting detail data (without clicking ok) the components data is not yet updated', () => {
    expect(true).toBeFalse();
  });

  it('when clicking ok on detail the components data is updated', () => {
    expect(true).toBeFalse();
  });

  it('when opening the detail with already present detail data the appropriate buttons are selected', () => {
    expect(true).toBeFalse();
  });

  it('when opening the detail and unknown detail data is provided, no error occurs', () => {
    expect(true).toBeFalse();
  });

  it('when providing a selected state to the component, the components selected css class is applied', () => {
    expect(true).toBeFalse();
  });

  it('when providing a non-selected state to the component, the components selected css class is removed/not applied', () => {
    expect(true).toBeFalse();
  });

  it('the provided name to the component is translated and displayed on the component', () => {
    expect(true).toBeFalse();
  });

  it('the provided icon to the component is is displayed', () => {
    expect(true).toBeFalse();
  });

  it('if no icon is provided to the component, no icon is displayed and the "only text" css class is applied', () => {
    expect(true).toBeFalse();
  });

  it('the provided css class to the component is applied', () => {
    expect(true).toBeFalse();
  });

  it('if no detail data is ever provided the components detail data is not set (no default value)', () => {
    expect(true).toBeFalse();
  });

  it('on the detail screen, the ok button can be clicked anytime', () => {
    expect(true).toBeFalse();
  });

  it('the provided onChange event is called, when the components value changes', () => {
    expect(true).toBeFalse();
  });

  it('the provided onBlur event is called, when the components looses focus', () => {
    expect(true).toBeFalse();
  });

  it('disabling the component will prevent the tap events to be fired', () => {
    expect(true).toBeFalse();
  });

  it('the provided name to the component will be set as css class', () => {
    expect(true).toBeFalse();
  });
});
