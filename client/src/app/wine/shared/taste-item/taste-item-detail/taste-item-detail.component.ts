import { Component, OnInit, Input } from '@angular/core';
import { TasteIntensityService } from 'src/app/wine/services/taste-intensity.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TasteQualifier } from 'src/app/wine/models/taste-qualifier';
import { TasteTimeQuantifier } from 'src/app/wine/models/taste-time-quantifier';

@Component({
  selector: 'app-taste-item-detail',
  templateUrl: './taste-item-detail.component.html',
  styleUrls: ['./taste-item-detail.component.scss'],
})
export class TasteItemDetailComponent implements OnInit {
  @Input() tasteKey = '';
  tasteIntensitiesLoaded = false;
  tasteQualifiers: TasteQualifier[] = [];
  tasteTimeQuantifiers: TasteTimeQuantifier[] = [];

  constructor(private tasteIntensityService: TasteIntensityService) { }

  ngOnInit() {
    forkJoin([this.tasteIntensityService.getTasteQualifiers(),
    this.tasteIntensityService.getTasteTimeQuantifiers()]).pipe(
      tap((tasteIntensities: [TasteQualifier[], TasteTimeQuantifier[]]) => {
        this.tasteIntensitiesLoaded = true;
        this.tasteQualifiers = tasteIntensities[0];
        this.tasteTimeQuantifiers = tasteIntensities[1];
      })
    ).subscribe();
  }
}
