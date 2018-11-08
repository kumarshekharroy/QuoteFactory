import { Injectable } from "@angular/core";
import { Shake } from '@ionic-native/shake';
import { Storage } from '@ionic/storage';
import { Settings } from './data-interface';

@Injectable()
export class SettingsManager {

    private settings: Settings = null

    constructor(private storage: Storage,
        private shake: Shake) {
    }

    resetSettings() {
        //let setting:Settings=
        this.settings =
            {
                isDarkMode: false,
                isFullScreen: false,
                isPro: false,
                ProValidTill: new Date().getTime(),
                isSyncedWithFirebase: false,
                isShakeModeEnabled: false,
                SyncedWithFirebaseOn: new Date().getTime(),
                isPushNotificationsEnabled: true,
                shakeIntensity: 60,
                speakSpeed: 0.95

            };
        console.log("resetSettings", this.settings);
    }

    async  getSettings(): Promise<Settings> {

        if (this.settings != null && this.settings != undefined)
            return this.settings;
        let data: Settings = await this.storage.get("Settings").catch(error => console.log('get Settings from storage.', error));

        if (data != null && data != undefined)
            this.settings = data;
        else
            await this.addSettings(null);


        return this.settings;
    }



    async addSettings(setting: Settings = null): Promise<boolean> {
        console.log("addSettings", setting);
        if (setting == null)
            this.resetSettings();
        else
            this.settings = setting;

        await this.storage.set("Settings", this.settings).catch((error) => { console.log('set Settings to storage After modification.', error); return false });
        return true;
    }



}