import { Observable, of } from 'rxjs';
import { TasteQualifier } from '../models/taste-qualifier';
import { TasteTimeQuantifier } from '../models/taste-time-quantifier';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
}
)
export class TasteIntensityService {
    getTasteQualifiers(): Observable<TasteQualifier[]> {
        return of([
            {
                key: 'hints',
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
                key: 'toomuch',
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
                key: 'after some time',
                intensity: 5
            },
            {
                key: 'with some air',
                intensity: 8,
            }
        ]);
    }
}
