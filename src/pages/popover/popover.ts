import { Component } from "@angular/core";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Market } from '@ionic-native/market';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewController } from "ionic-angular";

@Component({
  selector: "page-popover",
  template: `
    <ion-list> 
    <ion-buttons padding>
        <button ion-item (click)="shareWithFriends()">
          <ion-icon name="share" left padding></ion-icon>  Share with Friends
        </button>  
        <button ion-item (click)="rateMe()">
          <ion-icon name="star" left padding></ion-icon> Rate Us
        </button> 
        <button ion-item (click)="feedback()">
          <ion-icon name="help-circle" left padding></ion-icon>Help/Feedback
        </button> 
        <button ion-item (click)="privacyPolicy()">
          <ion-icon name="lock" left padding></ion-icon> Privacy Policy
        </button> 
        <button ion-item (click)="termsAndContitions()">
          <ion-icon name="paper" left padding></ion-icon> Terms And Contitions
        </button>  
        <button ion-item (click)="aboutMe()">
          <ion-icon name="information-circle" left padding></ion-icon> About Developer
        </button> 
        </ion-buttons> 
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController,
    private market: Market,
    private socialSharing: SocialSharing,
    private inAppBrowser: InAppBrowser) { }

  close() {
    this.viewCtrl.dismiss();
  }
  shareWithFriends() {
    this.socialSharing.share("Try the best Quote App : #QuoteFactory", "Quote Factory App", null, "http://bit.ly/QuoteFactory");

  }
  rateMe() {
    this.market.open('com.shekharroy.quote.factory');
  }
  aboutMe() {
    this.inAppBrowser.create("https://shekharroy.com/");

  }
  privacyPolicy() {
    this.inAppBrowser.create("https://flycricket.io/quote-factory-home/privacy.html");
  }
  termsAndContitions() {
    this.inAppBrowser.create("https://flycricket.io/quote-factory-home/terms.html");
  }
  
  feedback()
  {
    this.socialSharing.canShareViaEmail().then(()=>{
      this.socialSharing.shareViaEmail("","Feedback : Quote Factory",["contact@shekharroy.com"]);
    })

  }

}