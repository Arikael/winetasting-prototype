import { Component, OnInit, Input } from '@angular/core';
import { TasteQualifier } from 'src/app/wine/models/taste-qualifier';
import { TasteTimeQuantifier } from 'src/app/wine/models/taste-time-quantifier';

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
