import { Injectable } from '@angular/core';
import { Grape } from './grape';
import { Observable, of } from 'rxjs';
import { publish, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GrapeApiService {

    getAllGrapes(): Observable<Grape[]> {
        console.log('test');
        const items: Grape[] = [
            {
                name: 'sauvignonBlanc',
                isFavorite: false,
                type: 'white'
            },
            {
                name: 'riesling',
                isFavorite: true,
                type: 'white'
            },
            {
                name: 'Chardonnay',
                isFavorite: false,
                type: 'white'
            },
            {
                name: 'merlot',
                isFavorite: true,
                type: 'red'
            },
            {
                name: 'Tempranillo',
                isFavorite: true,
                type: 'red'
            },
            {
                name: 'Pinot Noir',
                isFavorite: false,
                type: 'red'
            }
        ];

        return of(items).pipe(
            share()
        );
    }
}
