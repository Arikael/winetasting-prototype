import { WineListItem } from '../wine-list/wine-list-item';
import { Observable, of } from 'rxjs';
import { ConnectorService } from '../connectors/connector-service';
import { Injectable } from '@angular/core';

@Injectable({
        providedIn: 'root'
    }
)
export class WineApiService {
    /**
     *
     */
    constructor(private connectorService: ConnectorService) {

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
}


