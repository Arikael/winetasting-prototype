import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TasteCategory } from '../../models/taste-category';

@Component({
  selector: 'app-taste-category',
  templateUrl: './taste-category.component.html',
  styleUrls: ['./taste-category.component.scss'],
})
export class TasteCategoryComponent implements OnInit, OnChanges {

  @Input() category: TasteCategory;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.category.currentValue) {

    }
  }

  ngOnInit() {}

}
