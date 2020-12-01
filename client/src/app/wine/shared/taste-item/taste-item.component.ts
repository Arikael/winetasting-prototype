import {
  Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, NgZone,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ModalController, GestureController, IonChip } from '@ionic/angular';
import { createTapAndDoubleTapGestureOnStart } from 'src/app/gestures-animations/tap-and-doubletap.gesture';
import { TasteSelectFormModel } from '../../models/taste.form-model';
import { TasteItemDetailComponent } from './taste-item-detail/taste-item-detail.component';

// TODO Check if CVA is needed
@Component({
  selector: 'app-taste-item',
  templateUrl: './taste-item.component.html',
  styleUrls: ['./taste-item.component.scss']
})
export class TasteItemComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  // @Input() tasteCategory = '';
  // @Input() tasteKey = '';
  @Input() hasIcon = false;
  @Input() value: TasteSelectFormModel = new TasteSelectFormModel();
  @ViewChild('tasteItem', { read: ElementRef }) tasteItem: any;

  @Output() selectionChanged = new EventEmitter<TasteSelectFormModel>();

  private onChange: () => {};
  private onTouched: () => {};

  get iconName() {
    return this.value.isSelected ? 'checkmark-outline' : 'none'; // dummy value because empty string doesnt work
  }

  get ngClassObj() {
    const obj = {
      'taste-item': true,
      selected: this.value.isSelected,
    };

    obj[this.value?.tasteCategory] = true;

    return obj;
  }

  constructor(public modalController: ModalController, private gestureController: GestureController, private ngZone: NgZone,
    private cd: ChangeDetectorRef) {
    this.value = new TasteSelectFormModel();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    const tapAndDoubleTapGesture = this.gestureController.create({
      gestureName: 'tapAndDoubleTap',
      el: this.tasteItem.nativeElement,
      threshold: 0,
      onStart: createTapAndDoubleTapGestureOnStart(
        () => this.ngZone.run(() => this.toggleSelectedState()),
        this.openDetail.bind(this),
        400)
    }, true);

    tapAndDoubleTapGesture.enable();
  }

  writeValue(obj: any): void {
    if (!TasteSelectFormModel.isOfType(obj)) {
      throw Error('provided value is not similar to TasteModel');
    }

    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  toggleSelectedState() {
    this.value.isSelected = !this.value.isSelected;
    this.selectionChanged.emit(this.value);
  }

  async openDetail() {
    const modal = await this.modalController.create({
      component: TasteItemDetailComponent,
      componentProps: {
        taste: this.value
      }
    });

    modal.onDidDismiss().then((modalData: any) => {
      if (modalData.data.hasChanged) {
        this.selectionChanged.emit(this.value);
      }
    });

    return await modal.present();
  }
}
