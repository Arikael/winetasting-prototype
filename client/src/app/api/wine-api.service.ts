import { WineListItem } from '../wine-list/wine-list-item';
import { Observable, of } from 'rxjs';
import { ConnectorService } from '../connectors/connector-service';

export class WineApiService {
    /**
     *
     */
    constructor(private storageService: ConnectorService) {

    }

    getWines(): Observable<WineListItem[]> {
        return of([]);
    }
}


