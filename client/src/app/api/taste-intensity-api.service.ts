import { Observable, of } from 'rxjs';
import { TasteQualifier } from '../wine/models/taste-qualifier';
import { TasteTimeQuantifier } from '../wine/models/taste-time-quantifier';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
}
)
export class TasteIntensityApiService {
    getTasteQualifiers(): Observable<TasteQualifier[]> {
        return of([
            {
                key: 'hintsOf',
                intensity: 1,
            },
            {
                key: 'some',
                intensity: 3
            },
            {
                key: 'alot',
                intensity: 7,
            },
            {
                key: 'tooMuch',
                intensity: 9
            }
        ]);
    }

    getTasteTimeQuantifiers(): Observable<TasteTimeQuantifier[]> {
        return of([
            {
                key: 'immediatly',
                intensity: 1,
            },
            {
                key: 'afterSomeTime',
                intensity: 5
            },
            {
                key: 'withSomeAir',
                intensity: 8,
            }
        ]);
    }
}
