import { Component, OnInit } from '@angular/core';
import { TasteService } from '../../services/taste.service';
import { Observable } from 'rxjs';
import { TasteCategory } from '../../models/taste-category';

@Component({
  selector: 'app-tastes',
  templateUrl: './tastes.component.html',
  styleUrls: ['./tastes.component.scss'],
})
export class TastesComponent implements OnInit {

  get tasteCategories(): Observable<TasteCategory[]> {
    return this.tasteService.getTasteCatgories('');
  }

  constructor(private tasteService: TasteService) { }

  ngOnInit() {

  }

}
