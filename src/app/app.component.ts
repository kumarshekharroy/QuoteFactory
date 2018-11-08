
import { Component } from '@angular/core'; 
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Events, Platform } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '../utility/FCM';
import { FullScreenSettings } from '../utility/FullScreenSettings';
import { Settings } from './../utility/data-interface';
import { QuotesManager } from './../utility/QuotesManager';
import { SettingsManager } from './../utility/SettingsManager';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  selectedTheme = "light-theme";

  settings: Settings;
  rootPage = TabsPage;

  constructor(private platform: Platform,
    private quotesManager: QuotesManager,
    private statusBar: StatusBar, private splashScreen: SplashScreen,
    private fullScreenSettings: FullScreenSettings,
    private settingsManager: SettingsManager, public events: Events,
    private fcm: FCM
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      try { await this.fullScreenSettings.goToFullScreen(); } catch (err) { console.log(err); }
      try { this.fcm.initFCM(); } catch (err) { console.log(err); }

      try { this.statusBar.backgroundColorByHexString("#b1b1b1"); } catch (err) { console.log(err); }

      this.settings = await this.settingsManager.getSettings();
      if (this.settings.isFullScreen)
        try { await this.fullScreenSettings.goToFullScreen(); console.log("goToFullScreen") } catch (err) { console.log(err); }
      else
        try { await this.fullScreenSettings.showSystemUI(); console.log("showSystemUI") } catch (err) { console.log(err); }

      if (this.settings.isDarkMode)
        this.selectedTheme = "dark-theme";

      this.events.subscribe('onThemeChange', (themeName) => {
        this.selectedTheme = themeName;
      });

      try { this.splashScreen.hide(); } catch (err) { console.log(err); }

      this.quotesManager.getAllQuotes();

    });

  }

  count: number = 0;
  isDoubleTap() {
    this.count++;
    setTimeout(() => {
      if (this.count <= 1) {
        this.count = 0;
      }
      else {
        this.count = 0;
      }
    }, 2000);
    return this.count <= 1 ? false : true;
  } 

  

}
