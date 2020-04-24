import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectorService } from './connectors/connector-service';
import { connectorSeviceFactory } from './app-factories.module';
import { WineApiService } from './api/wine-api.service';
import { LocalStorageService } from './connectors/local-storage-service';
import { WineListComponent } from './wine/wine-list/wine-list.component';
import { WineListItemComponent } from './wine/wine-list/wine-list-item/wine-list-item.component';
import { TranslocoRootModule } from './transloco-root.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WineListComponent,
    WineListItemComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslocoRootModule
  ],
  providers: [
    {
      provide: ConnectorService,
      useFactory: connectorSeviceFactory,
      deps: [Platform]
    },
    StatusBar,
    Platform,
    SplashScreen,
    LocalStorageService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
