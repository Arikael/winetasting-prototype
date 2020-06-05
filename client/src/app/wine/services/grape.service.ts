import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GrapeModel, GrapeType } from '../models/grape.model';

@Injectable({
    providedIn: 'root'
})
export class GrapeService {
    getAllGrapes(): Observable<GrapeModel[]> {
        const items: GrapeModel[] = [
            {
                name: 'sauvignonBlanc',
                isFavorite: false,
                type: GrapeType.white
            },
            {
                name: 'riesling',
                isFavorite: true,
                type: GrapeType.white
            },
            {
                name: 'Chardonnay',
                isFavorite: false,
                type: GrapeType.white
            },
            {
                name: 'merlot',
                isFavorite: true,
                type: GrapeType.red
            },
            {
                name: 'Tempranillo',
                isFavorite: true,
                type: GrapeType.red
            },
            {
                name: 'Pinot Noir',
                isFavorite: false,
                type: GrapeType.red
            }
        ];

        return of(items).pipe(
            shareReplay()
        );
    }
}
