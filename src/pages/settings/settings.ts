import { Component } from '@angular/core';
import { Events, NavController, NavParams, Toggle } from 'ionic-angular';
import { SettingsManager } from '../../utility/SettingsManager';
import { AdMob } from './../../utility/ADMob';
import { Settings } from './../../utility/data-interface';
import { FCM } from './../../utility/FCM';
import { FullScreenSettings } from './../../utility/FullScreenSettings';
import { Helper } from './../../utility/Helper';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  settings: Settings;
  RemainingDays = 0;
  speechSpeed = 0.95;
  constructor(public navCtrl: NavController,
    private fcm: FCM,
    private adMob: AdMob,
    public events: Events,
    public navParams: NavParams,
    private settingsManager: SettingsManager,
    private helper: Helper,
    private fullScreenSettings: FullScreenSettings
  ) {
    this.fetchSettings();
  }

  async fetchSettings() {
    this.settings = await this.settingsManager.getSettings();//.catch(err=>this.settingsManager.addSettings(null));
    this.speechSpeed = this.settings.speakSpeed * 100;
    this.remainingProDays();
  }



  ionViewWillEnter() {
    this.adMob.shouldBannerBeVisible = false;
    setTimeout(() => { this.adMob.hideAdBanner(); });

  }
  isShakeModeEnabled() {
    return this.settings.isShakeModeEnabled;
  }

  toggleisShakeMode(event: Toggle) {
    this.settings.isShakeModeEnabled = event.checked;
    this.settingsManager.addSettings(this.settings);
  }


  onSpeechSpeedChange() {
    this.settings.speakSpeed = this.speechSpeed / 100;
    this.settingsManager.addSettings(this.settings);

  }
  onShakeIntensityChange() {
    this.settingsManager.addSettings(this.settings);
  }

  isNightMode() {
    return this.settings.isDarkMode;
  }

  toggleNightMode(event: Toggle) {
    this.settings.isDarkMode = event.checked;
    this.settingsManager.addSettings(this.settings);

    if (this.settings.isDarkMode)
      this.events.publish('onThemeChange', 'dark-theme');
    else
      this.events.publish('onThemeChange', 'ligth-theme');
  }


  isPushNotificationsEnabled(): boolean {
    return this.settings.isPushNotificationsEnabled;
  }

  togglePushNotificationsEnabled(event: Toggle) {
    this.settings.isPushNotificationsEnabled = event.checked;
    this.settingsManager.addSettings(this.settings);

    if (this.settings.isPushNotificationsEnabled)
      this.fcm.initFCM();
    else
      this.fcm.unsubscribeFromTopic("android");
  }


  isFullScreen(): boolean {
    return this.settings.isFullScreen;
  }

  toggleFullScreen(event: Toggle) {
    this.settings.isFullScreen = event.checked;
    this.settingsManager.addSettings(this.settings);

    if (this.settings.isFullScreen)
      this.fullScreenSettings.goToFullScreen();
    else
      this.fullScreenSettings.showSystemUI();
  }

  isPro(): boolean {
    return this.settings.isPro;
  }

  remainingProDays() {
    let today = new Date().getTime();
    let validTill = this.settings.ProValidTill;
    let remainingdays: number = Math.floor((validTill - today) / (1000 * 60 * 60 * 24))
    this.RemainingDays = remainingdays < 0 ? -1 : remainingdays;
  }

  tapcount: number = 0;
  toggleProMode() {
    this.tapcount++;
    // if (this.tapcount > 2 && this.tapcount < 5)
    //   this.helper.showToast((5 - this.tapcount) + " tap remaining to " + (this.settings.isPro ? "relock" : "unlock") + " pro.", 1000, "center")
    // else if (this.tapcount >= 5)
    //   this.helper.showToast("You've " + (this.settings.isPro ? "relocked" : "unlocked") + " pro.")

    let today = new Date();
    let maxEpiry = today;
    maxEpiry.setDate(maxEpiry.getDate() + 30);
    if (this.tapcount >= 10) {
      this.tapcount = 0;
      this.settings.isPro = this.settings.isPro == false ? true : false;
      if (this.settings.isPro)
        this.settings.ProValidTill = this.settings.isPro ? maxEpiry.getTime() : today.getTime();
      this.settingsManager.addSettings(this.settings);
      if (this.settings.isPro) {
        this.remainingProDays();
        this.adMob.shouldBannerBeVisible = false;
        setTimeout(() => { this.adMob.hideAdBanner(); }, 1000);
      }
      else {
        this.adMob.shouldBannerBeVisible = true;
        setTimeout(() => { this.adMob.showAdBanner(); }, 3000);
      }

      this.helper.showToast("You've " + (this.settings.isPro ? "unlocked" : "relocked") + " pro mode.")

    }
    setTimeout(() => {
      this.tapcount = 0;
    }, 5000);



  }


}
