import { Component, OnInit, Input, ViewChildren, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { TasteQualifier } from 'src/app/wine/models/taste-qualifier';
import { TasteTimeQuantifier } from 'src/app/wine/models/taste-time-quantifier';
import { TasteIntensity } from 'src/app/wine/models/taste-intensity';
import { nameof } from 'src/app/utilities/nameof';
import { TasteItemDetailComponent } from '../taste-item-detail.component';

export class TasteItemButtonDetailFinishedEventArgs {
  tasteQualifier: TasteQualifier = new TasteQualifier();
  tasteTimeQuantifier: TasteTimeQuantifier = new TasteTimeQuantifier();
}

@Component({
  selector: 'app-taste-item-button-detail-component',
  templateUrl: './taste-item-button-detail.component.html',
  styleUrls: ['./taste-item-button-detail.component.scss'],
})
export class TasteItemButtonDetailComponent implements OnInit {

  @Input() tasteKey = '';
  @Input() tasteQualifiers: TasteQualifier[] = [];
  @Input() tasteTimeQuantifiers: TasteTimeQuantifier[] = [];
  @Input() selectedTasteQualifier: TasteQualifier = new TasteQualifier();
  @Input() selectedTasteTimeQuantifier: TasteTimeQuantifier = new TasteTimeQuantifier();
  @Output() finishedEdit = new EventEmitter<TasteItemButtonDetailFinishedEventArgs>();
  private finishedEventArgs = new TasteItemButtonDetailFinishedEventArgs();

  constructor() { }
  ngOnInit() { }

  finish() {
    this.finishedEdit.emit(this.finishedEventArgs);
  }

  onTasteTimeQuantifiersSelected(data: any) {
    this.finishedEventArgs.tasteTimeQuantifier = data;
  }

  onTasteQualifiersSelected(data: any) {
    this.finishedEventArgs.tasteQualifier = data;
  }
}
