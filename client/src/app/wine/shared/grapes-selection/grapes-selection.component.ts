import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GrapeApiService } from 'src/app/api/grape-api.service';
import { Grape } from 'src/app/api/grape';

export class GrapeSelectionView {
  whiteGrapes: Grape[];
  redGrapes: Grape[];
}

@Component({
  selector: 'app-grapes-selection',
  templateUrl: './grapes-selection.component.html',
  styleUrls: ['./grapes-selection.component.scss'],
})
export class GrapesSelectionComponent implements OnInit {

  private allGrapes: Observable<GrapeSelectionView>;

  constructor(private grapeApiService: GrapeApiService) { }


  get favoriteGrapes(): Observable<Grape[]> {
    return this.grapeApiService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.isFavorite))
    );
  }

  get redGrapes(): Observable<Grape[]> {
    return this.grapeApiService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.type === 'red'))
    );
  }

  get whiteGrapes(): Observable<Grape[]> {
    return this.grapeApiService.getAllGrapes().pipe(
      map((item) => item.filter(arrItem => arrItem.type === 'white'))
    );
  }

  ngOnInit() {

  }

  onFavoriteClick(favorite: Grape) {

  }

}
