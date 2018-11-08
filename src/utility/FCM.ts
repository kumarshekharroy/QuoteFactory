import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Helper } from './Helper';
import { QuotesManager } from './QuotesManager';
import { SettingsManager } from './SettingsManager';



@Injectable()
export class FCM {
  fcmtoken: string = null;

  constructor(
    public fcm: Firebase,
    private settingsManager: SettingsManager,
    private quotesManager: QuotesManager, private helper: Helper,
  ) { }

  // scheduleNotification(data) {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: data.title, autoClear: true,
  //     clock: true, launch: true, lockscreen: true, priority: 2,
  //     // : data.message,
  //     data: data,
  //     // at:  new Date().getTime() + 5 * 1000
  //     led: 'FF0000',
  //   });
  // }



  // Get permission from the user

  async initFCM() {
    let settings = await this.settingsManager.getSettings();

    if (settings != null && !settings.isPushNotificationsEnabled)
      return;
    await this.getToken();
    this.onTokenRefresh();
    // this.onForgroundMessage();
    // this.onBackgroundMessage(); 
    this.OnNotification();
    this.subscribeToTopic("android");

    this.fcm.setAnalyticsCollectionEnabled(true);
  }


  async getToken(): Promise<string> {
    try {
      this.fcmtoken = await this.fcm.getToken();
      console.log("getToken this.fcmtoken=>", this.fcmtoken);
    }
    catch (error) {
      console.log("exception in getToken() =>>", error);
    }
    return this.fcmtoken;
  }




  async onTokenRefresh() {
    try {
      await this.fcm.onTokenRefresh().subscribe(async () => {
        this.fcmtoken = null
        await this.getToken();
        console.log("onTokenRefresh() this.fcmtoken=>", this.fcmtoken);
      });
    }
    catch (error) {
      console.log("exception in onTokenRefresh() =>>", error);
    }
  }

  async OnNotification() {
    try {
      this.fcm.onNotificationOpen()
        .subscribe(res => {
          if (res.tap) {
            console.log("background payload =>", res);
            this.syncLauncherBadge(1);
            if (res.type == "QuoteOfTheDay") {
              this.quotesManager.addQuoteToQuotesOfTheDay(res.QT, res.AU);
              // this.scheduleNotification({ type: "QuoteOfTheDay", title: "Quote Of The Day", messsage: res.QT });

              //  this.scheduleNotification({ type: "QuoteOfTheDay", title: "Quote Of The Day background", messsage: res.QT });

            }

          } else if (!res.tap) {

            console.log("forground payload =>", res);
            this.syncLauncherBadge(1);
            if (res.type == "QuoteOfTheDay") {
              this.quotesManager.addQuoteToQuotesOfTheDay(res.QT, res.AU);
              this.helper.showToast("Quote Of The Day Received");
              // this.scheduleNotification({ type: "QuoteOfTheDay", title: "Quote Of The Day forground", messsage: res.QT });

            }

          }
        });
    }
    catch (error) {
      console.log("exception in onNotificationOpen() =>>", error);
    }
  }



  // async onForgroundMessage() {
  //   try {
  //     await this.fcm.onMessage().subscribe(async (payload) => {
  //       console.log("forground payload =>", payload);
  //       this.syncLauncherBadge(1);
  //       if (payload.type == "QuoteOfTheDay") {
  //         this.quotesManager.addQuoteToQuotesOfTheDay(payload.QT, payload.AU);

  //         this.helper.showToast("Quote Of The Day Received");
  //       }

  //     });
  //   }
  //   catch (error) {
  //     console.log("exception in onForgroundMessage() =>>", error);
  //   }
  // }





  // async onBackgroundMessage() {
  //   try {
  //     await this.fcm.onBackgroundMessage().subscribe(async (payload) => {
  //       console.log("background payload =>", payload);
  //       this.syncLauncherBadge(1);
  //       if (payload.type == "QuoteOfTheDay") {
  //         this.quotesManager.addQuoteToQuotesOfTheDay(payload.QT, payload.AU);
  //         this.scheduleNotification({ type: "QuoteOfTheDay", title: "Quote Of The Day", messsage: payload.QT });
  //       }

  //     });
  //   }
  //   catch (error) {
  //     console.log("exception in onBackgroundMessage() =>>", error);
  //   }
  // }






  async syncLauncherBadge(incrementOrdecrement: number): Promise<boolean> {
    let isSuccess = true;
    try {
      let badgeCount = await this.fcm.getBadgeNumber();
      await this.fcm.setBadgeNumber(badgeCount + incrementOrdecrement);//.catch((err) => { console.log("exception in unsubscribeFromTopic() =>>", err); isSuccess = false; });
    }
    catch (error) {
      console.log("exception in syncLauncherBadge() =>>", error);
      isSuccess = false;
    }
    return isSuccess;
  }







  async subscribeToTopic(Topic: string = "android"): Promise<boolean> {
    let isSuccess = true;
    try {
      await this.fcm.subscribe(Topic);
    }
    catch (error) {
      console.log("exception in subscribeToTopic() =>>", error);
      isSuccess = false;
    }
    return isSuccess;
  }







  async unsubscribeFromTopic(Topic: string = "android"): Promise<boolean> {
    let isSuccess = true;
    try {
      await this.fcm.unsubscribe(Topic);
    }
    catch (error) {
      console.log("exception in unsubscribeFromTopic() =>>", error);
      isSuccess = false;
    }
    return isSuccess;
  }

}