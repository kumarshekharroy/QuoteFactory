import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Settings } from './data-interface';
import { SettingsManager } from './SettingsManager';

@Injectable()
export class AdMob {
    BannerId = "ca-app-pub-1110628763402987/8320437139";
    InterstitialId = "ca-app-pub-1110628763402987/5832793024";
    public shouldBannerBeVisible = false;
    public isCurrentlyVisible = false;
    settings: Settings
    constructor(
        private admobFree: AdMobFree,
        private settingsManager: SettingsManager) {

    }

    async showAdBanner(isTestAd: boolean = false, isTop: boolean = false, isOverlap: boolean = false) {
        this.settings = await this.settingsManager.getSettings();//.catch(err=>this.settingsManager.addSettings(null));

        if (this.settings.isPro && this.settings.ProValidTill >= new Date().getTime())
            return;

        const bannerConfig: AdMobFreeBannerConfig = {
            id: isTestAd ? undefined : this.BannerId,
            isTesting: isTestAd,
            bannerAtTop: isTop,
            overlap: isOverlap
        };

        this.admobFree.banner.config(bannerConfig);

        if (this.shouldBannerBeVisible && !this.isCurrentlyVisible)
            this.admobFree.banner.prepare().then(() => {
                if (this.shouldBannerBeVisible && !this.isCurrentlyVisible) {
                    this.admobFree.banner.show();
                    this.isCurrentlyVisible = true;
                }
            }).catch(e => console.log(e));
    }

    hideAdBanner() {
        if (!this.shouldBannerBeVisible && this.isCurrentlyVisible) {
            this.admobFree.banner.hide();
            this.isCurrentlyVisible = false;
        }
    }


    async showAdInterstitial(isTestAd: boolean = false, delay: number = 100) {
        this.settings = await this.settingsManager.getSettings();//.catch(err=>this.settingsManager.addSettings(null));

        if (this.settings.isPro && this.settings.ProValidTill >= new Date().getTime())
            return;

        const interstitialConfig: AdMobFreeInterstitialConfig = {
            id: isTestAd ? undefined : this.InterstitialId,
            isTesting: isTestAd
        };
        this.admobFree.interstitial.config(interstitialConfig);
        this.admobFree.interstitial.prepare().then(() => {
            setTimeout(() => {
                this.admobFree.interstitial.show();
            }, delay);
        }).catch(e => { console.log(e) });
    }


}