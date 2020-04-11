import { Platform } from '@ionic/angular';
import { LocalStorageService } from '../connectors/local-storage-service';

export function connectorSeviceFactory(platform: Platform) {
    if (platform.is('hybrid')) {
        return new LocalStorageService();
    }

    return new LocalStorageService();
}
