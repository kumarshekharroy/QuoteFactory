import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AdMobFree } from '@ionic-native/admob-free';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AppRate } from '@ionic-native/app-rate';
import { File } from '@ionic-native/file';
import { Firebase } from '@ionic-native/firebase';
import { InAppBrowser } from '@ionic-native/in-app-browser'; 
import { Market } from '@ionic-native/market'; 
import { Shake } from '@ionic-native/shake';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// added libs
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HideHeaderDirective } from '../directives/hide-header/hide-header';
import { HomePage } from '../pages/home/home';
import { LikedPage } from '../pages/liked/liked';
import { PopoverPage } from '../pages/popover/popover';
import { QuotePage } from '../pages/quote/quote';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { AdMob } from '../utility/ADMob';
import { FCM } from '../utility/FCM';
import { FullScreenSettings } from '../utility/FullScreenSettings';
import { QuotesManager } from '../utility/QuotesManager';
import { SettingsManager } from '../utility/SettingsManager';
import { NotificationPage } from './../pages/notification/notification';
import { SettingsPage } from './../pages/settings/settings';
import { MyFileManager } from './../utility/FileManager';
import { Helper } from './../utility/Helper';
import { MyApp } from './app.component';

  




@NgModule({
  declarations: [
    MyApp,
    NotificationPage,
    QuotePage,
    SettingsPage,
    TabsPage,
    HomePage,
    SearchPage,
    LikedPage,
    HideHeaderDirective,
    PopoverPage,
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp, {
      // mode: 'ios',
      // pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot(), 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationPage,
    QuotePage,
    SettingsPage,
    TabsPage,
    HomePage,
    SearchPage,
    LikedPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QuotesManager,
    Helper,
    SocialSharing,
    File,
    MyFileManager,
    AndroidPermissions,
    AdMobFree,
    AdMob,
    AndroidFullScreen,
    FullScreenSettings,
    SettingsManager,
    FCM, 
    Firebase, 
    AppRate,
    Market,
    InAppBrowser,
    Shake  
    // FcmProvider,
  ]
})
export class AppModule { }
