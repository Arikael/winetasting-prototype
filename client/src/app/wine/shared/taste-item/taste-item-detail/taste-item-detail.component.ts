import { Component, OnInit, Input } from '@angular/core';
import { TasteIntensityApiService } from 'src/app/api/taste-intensity-api.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TasteQualifier } from 'src/app/wine/models/taste-qualifier';
import { TasteTimeQuantifier } from 'src/app/wine/models/taste-time-quantifier';
import { ModalController } from '@ionic/angular';

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

  constructor(private tasteIntensityService: TasteIntensityApiService, private modalController: ModalController) { }

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

  dismissModal(event: any) {
    this.modalController.dismiss();
  }

  finishEdit(data: any) {
    this.modalController.dismiss();
  }
}
