import { Component, OnInit, Input } from '@angular/core';
import { WineListItem } from '../wine-list-item';

@Component({
  selector: 'app-wine-list-item',
  templateUrl: './wine-list-item.component.html',
  styleUrls: ['./wine-list-item.component.scss'],
})
export class WineListItemComponent implements OnInit {

  @Input() item: WineListItem;
  constructor() { }

  ngOnInit() {}

}
