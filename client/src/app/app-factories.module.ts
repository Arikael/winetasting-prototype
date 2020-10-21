import { Platform } from '@ionic/angular';
import { PouchDbStorageService } from './api/pouchdb-storage.service';
import { StorageService } from './api/storage.service';

export function storageSeviceFactory(platform: Platform) {
    let storageService: StorageService;

    if (platform.is('hybrid')) {
        storageService = new PouchDbStorageService(platform);
    }

    storageService = new PouchDbStorageService(platform);
    storageService.initialize();

    return storageService;
}
