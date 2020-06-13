import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TasteCategory } from '../../models/taste-category';

@Component({
  selector: 'app-taste-category',
  templateUrl: './taste-category.component.html',
  styleUrls: ['./taste-category.component.scss'],
})
export class TasteCategoryComponent {

  @Input() category = '';

}
