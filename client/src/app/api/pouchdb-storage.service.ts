import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PouchDbStorageService extends StorageService {
    private db: any;
    
    constructor(private platform: Platform) {
        super();
    }

    initialize() {
        let config: unknown = {};

        if(this.platform.is('cordova')) {
            PouchDB.plugin(cordovaSqlitePlugin);
            config = { adapter: 'cordova-sqlite' };
        }
        this.db = new PouchDB('wine.db', config);
    }

    delete(id: string, options: unknown) {
        throw new Error('Method not implemented.');
    }
    save<T>(doc: T, options: unknown) {
        throw new Error('Method not implemented.');
    }
    get<T>(docId: string, options: unknown): Observable<T> {
        throw new Error('Method not implemented.');
    }
    find<T>(options: unknown): Observable<T[]> {
        throw new Error('Method not implemented.');
    }

}