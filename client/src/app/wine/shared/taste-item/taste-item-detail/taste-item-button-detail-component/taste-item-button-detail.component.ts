import { Component, OnInit, Input, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { TasteQualifier } from 'src/app/wine/models/taste-qualifier';
import { TasteTimeQuantifier } from 'src/app/wine/models/taste-time-quantifier';
import { TasteIntensity } from 'src/app/wine/models/taste-intensity';
import { nameof } from 'src/app/utilities/nameof';
import { TasteItemDetailComponent } from '../taste-item-detail.component';

@Component({
  selector: 'app-taste-item-button-detail-component',
  templateUrl: './taste-item-button-detail.component.html',
  styleUrls: ['./taste-item-button-detail.component.scss'],
})
export class TasteItemButtonDetailComponent implements OnInit {

  @Input() tasteKey = '';
  @Input() tasteQualifiers: TasteQualifier[] = [];
  @Input() tasteTimeQuantifiers: TasteTimeQuantifier[] = [];

  constructor() { }
  ngOnInit() {}



}
