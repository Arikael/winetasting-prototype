import { Platform } from '@ionic/angular';
import { LocalStorageService } from './connectors/local-storage-service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function connectorSeviceFactory(platform: Platform) {
    if (platform.is('hybrid')) {
        return new LocalStorageService();
    }

    return new LocalStorageService();
}
