import { Component, ViewChild } from "@angular/core";
import { IonicApp, Platform, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LikedPage } from '../liked/liked';
import { SearchPage } from '../search/search';
import { Helper } from './../../utility/Helper';
import { NotificationPage } from './../notification/notification';
import { SettingsPage } from './../settings/settings';
import { AppRate } from "@ionic-native/app-rate";


@Component({
    selector: "page-tabs",
    template: `
    <ion-tabs #bottomTab selectedIndex="0"> 
    <ion-tab [root]="HomeTab"  tabIcon="home"></ion-tab>
    <ion-tab [root]="SearchTab"   tabIcon="search"></ion-tab> 
    <ion-tab [root]="LikedTab"  tabIcon="heart"></ion-tab> 
    <ion-tab [root]="NotificationTab"  tabIcon="quote"></ion-tab>
    <ion-tab [root]="SettingsTab"  tabIcon="settings"></ion-tab> 
    </ion-tabs>
    
    `
})
export class TabsPage {
    counter = 0;
    @ViewChild("bottomTab") bottomTab: Tabs;

    constructor(private platform: Platform,
        private appRate: AppRate, private ionicApp: IonicApp, private helper: Helper) {
       
            this.platform.registerBackButtonAction(() => {
            let activeModal = this.ionicApp._getActivePortal();
            if (activeModal == undefined || activeModal == null) {
                if (this.bottomTab.getSelected().index == 0) {
                    if (this.bottomTab._tabs[0].canGoBack()) {
                        this.bottomTab._tabs[0].pop();
                    }
                    else if (this.counter == 0) {
                        this.counter = 1;
                        this.helper.showToast('Click again to close the app.');
                        setTimeout(() => { this.counter = 0 }, 3000);
                    } else {
                        this.platform.exitApp();
                    }
                }
                else {
                    this.bottomTab.select(0);
                }
            }
            else {
                activeModal.pop();
            }
        });


   this.initRateMeDialogue();
//    if(this.appRate.preferences){
//     this.appRate.preferences.usesUntilPrompt -= 1
//   }
    }

    initRateMeDialogue() {
        this.appRate.preferences = {
          //openStoreInApp: false,
          displayAppName: 'Quote Factory',
          usesUntilPrompt: 3,
          promptAgainForEachNewVersion: true,
          storeAppURL: { 
            android: 'market://details?id=com.shekharroy.quote.factory'
          },
          customLocale: {
            title: 'Do you enjoy %@?',
            message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
            cancelButtonLabel: 'No, Thanks',
            laterButtonLabel: 'Remind Me Later',
            rateButtonLabel: 'Rate It Now'
          },
          callbacks: {
            onRateDialogShow: function (callback) {
              console.log('rate dialog shown!');
            },
            onButtonClicked: function (buttonIndex) {
              console.log('Selected index: -> ' + buttonIndex);
            }
          }
    
        };
         this.appRate.promptForRating(false);
      }
    
    NotificationTab = NotificationPage;
    LikedTab = LikedPage;
    HomeTab = HomePage;
    SearchTab = SearchPage;
    AddTab = SearchPage;
    SettingsTab = SettingsPage;
}