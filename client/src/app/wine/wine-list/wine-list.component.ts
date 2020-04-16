import { Component, OnInit } from '@angular/core';
import { WineApiService } from 'src/app/api/wine-api.service';
import { Observable } from 'rxjs';
import { WineListItem } from './wine-list-item';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss'],
})
export class WineListComponent implements OnInit {

  get wines(): Observable<WineListItem[]> {
    return this.wineApiService.getWines();
  }

  constructor(public wineApiService: WineApiService) { }

  ngOnInit() {

  }

}
