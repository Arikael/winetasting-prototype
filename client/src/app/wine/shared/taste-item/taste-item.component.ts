import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ModalController, GestureController, IonChip } from '@ionic/angular';
import { createTapAndDoubleTapGestureOnStart } from 'src/app/gestures-animations/tap-and-doubletap.gesture';
import { TasteFormModel } from '../../models/taste.form-model';
import { TasteItemDetailComponent } from './taste-item-detail/taste-item-detail.component';

@Component({
  selector: 'app-taste-item',
  templateUrl: './taste-item.component.html',
  styleUrls: ['./taste-item.component.scss']
})
export class TasteItemComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() tasteCategory = '';
  @Input() tasteKey = '';
  @Input() hasIcon = false;
  @ViewChild('tasteItem', { read: ElementRef }) tasteItem: any;
  private value: TasteFormModel = null;
  private onChange: () => {};
  private onTouched: () => {};

  get iconName() {
    return this.isSelected ? 'checkmark-outline' : '';
  }
  isSelected = false;

  get ngClassObj() {
    const obj = {
      'taste-item': true,
      selected: this.isSelected,
    };

    obj[this.tasteCategory] = true;

    return obj;
  }

  constructor(public modalController: ModalController, private gestureController: GestureController, private ngZone: NgZone,
              private cd: ChangeDetectorRef) {
    this.value = new TasteFormModel();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    console.log('test');
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
    if (!TasteFormModel.isOfType(obj)) {
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
    this.isSelected = !this.isSelected;
  }

  async openDetail() {
    const modal = await this.modalController.create({
      component: TasteItemDetailComponent,
      componentProps: {
        tasteKey: this.tasteKey
      }
    });

    return await modal.present();
  }
}
