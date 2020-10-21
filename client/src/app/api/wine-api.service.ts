import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { WineListItem } from '../wine/wine-list/wine-list-item';
import { WineDto } from './dtos/wine.dto';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class WineApiService {
    /**
     *
     */
    constructor(private storageService: StorageService) {

    }

    getWines(): Observable<WineListItem[]> {
        return of([{
            title: 'St. Nikolaus',
            year: 2016,
            producer: 'Peter Jakob Kühn',
            rating: 5,
        },
        {
            title: 'Pettenthal',
            year: 2016,
            producer: 'Kai Schätzel',
            rating: 5,
        }]);
    }

    saveWine(wine: WineDto) {

    }
}


