import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ModalController, GestureController } from '@ionic/angular';
import { TasteItemDetailComponent } from './taste-item-detail.component';
import { createTapAndDoubleTapGestureOnStart } from 'src/app/gestures-animations/tap-and-doubletap.gesture';
import { TasteModel } from '../../models/taste.model';

@Component({
  selector: 'app-taste-item',
  templateUrl: './taste-item.component.html',
  styleUrls: ['./taste-item.component.scss'],
})
export class TasteItemComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() color = '';
  @Input() tasteKey = '';
  @ViewChild('tasteItem') tasteDiv: ElementRef;
  private value: TasteModel = null;
  private onChange: () => {};
  private onBlur: () => {};

  get isSelected(): boolean {
    return this.value?.isSelected;
  }

  constructor(public modalController: ModalController, private gestureController: GestureController) { }

  ngAfterViewInit(): void {
    const tapAndDoubleTapGesture = this.gestureController.create({
      gestureName: 'tapAndDoubleTap',
      el: this.tasteDiv.nativeElement,
      threshold: 0,
      onStart: createTapAndDoubleTapGestureOnStart(() => this.toggleSelectedState, () => this.openDetail, 400)
    });

    tapAndDoubleTapGesture.enable();
  }

  writeValue(obj: any): void {
    if (!TasteModel.isOfType(obj)) {
      throw Error('provided value is not similar to TasteModel');
    }

    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() { }

  toggleSelectedState() {
    this.value.isSelected = !this.value.isSelected;
  }

  async openDetail() {
    const modal = await this.modalController.create({
      component: TasteItemDetailComponent
    });

    return await modal.present();
  }
}
