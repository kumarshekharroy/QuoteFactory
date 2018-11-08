import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as html2canvas from 'html2canvas';
import { NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { QuotesManager } from '../../utility/QuotesManager';
import { PopoverPage } from '../popover/popover';
import { SearchPage } from '../search/search';
import { AdMob } from './../../utility/ADMob';
import { Quote, Settings } from './../../utility/data-interface';
import { MyFileManager } from './../../utility/FileManager';
import { Helper } from './../../utility/Helper';
import { SettingsManager } from './../../utility/SettingsManager';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {


  mysetting: Settings;
  downlodCount: 0;
  shareCount: 0;

  AllQuotesOfTheDay: Quote[] = [];

  pageIndex: number = 0;
  pageSize: number = 20;

  isSpeaking = false;
  speakingQuoteIndex = 0;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private quotesManager: QuotesManager,
    private helper: Helper,
    private socialShare: SocialSharing,
    public myfileManager: MyFileManager,
    private adMob: AdMob,
    private settings: SettingsManager,
    public popoverCtrl: PopoverController) {
  }

  async ionViewWillEnter() {
    this.loadQuotes();
    this.mysetting = await this.settings.getSettings();
    this.adMob.shouldBannerBeVisible = true;
    setTimeout(() => { this.adMob.showAdBanner(); }, 3000);
  }

  showQuotesByAuthor(searchKey: string) {
    this.navCtrl.push(SearchPage, { searchKey: searchKey });
  }
  async loadQuotes() {
    this.AllQuotesOfTheDay = await this.quotesManager.getAllQuotesOfTheDay();
  }


  async SpeakAll() {
    this.isSpeaking = !this.isSpeaking;
    let index = 0;

    for (let item of this.AllQuotesOfTheDay) {
      index++;
      if (this.speakingQuoteIndex <= index && this.isSpeaking) {
        let b = document.getElementById("" + item.ID);
        if (b) b.scrollIntoView({ block: 'start', behavior: 'smooth' });
        await this.helper.readIt(item.QT + " by " + item.AU);
        this.speakingQuoteIndex = index;
      }
      if (index == this.AllQuotesOfTheDay.length - 1)
        this.isSpeaking = false;
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {}, { cssClass: 'popover-class' });
    popover.present({
      ev: myEvent
    });
  }




  // async loadQuotes(infiniteScroll?) {
  //   let data = await this.quotesManager.getAllQuotesOfTheDayByTakeSkip(this.pageIndex * this.pageSize, this.pageSize);

  //   this.AllQuotesOfTheDay = this.AllQuotesOfTheDay.concat(data);
  //   if (infiniteScroll != undefined && (data == null || data.length < this.pageSize))
  //     infiniteScroll.enable(false);
  //   if (infiniteScroll) {
  //     infiniteScroll.complete();
  //   }
  // }


  // loadMore(infiniteScroll) {
  //   if(this.AllQuotesOfTheDay.length==0)
  //   {
  //     infiniteScroll.enable(false);
  //   return;
  //   }
  //   setTimeout(() => {
  //     this.loadQuotes(infiniteScroll);
  //     this.pageIndex++;
  //     if (this.pageIndex % 2 == 0)
  //       this.adMob.showAdInterstitial();
  //   }, 250);
  // }







  count: number = 0;
  doubleTap(quote: Quote) {
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        quote.BG = this.quotesManager.getRandomImage("background");
      } if (this.count > 1) {
        this.count = 0;
      }
    }, 250);
  }
  swiped(quote: Quote) {
    quote.BG = this.quotesManager.getRandomImage("background");
  }

  readTheQuote(quote: Quote) {
    this.isSpeaking = false;
    this.helper.readIt(quote.QT);
  }

  calculateTime(quote: Quote): string {
    let sec = (new Date().getTime() - quote.T) / 1000;
    if (sec < 60) { return parseInt("" + sec) + (parseInt("" + sec) > 1 ? ' secs ' : ' sec') }
    else if (sec < 3600) { return parseInt("" + sec / 60) + (parseInt("" + sec / 60) > 1 ? ' mins ' : ' min') }
    else if (sec < 84600) { return (parseInt("" + sec / 3600) + (parseInt("" + sec / 3600) > 1 ? ' hours ' : ' hour')) }
    else { return parseInt("" + sec / 84600) + (parseInt("" + sec / 84600) > 1 ? ' days ' : ' day') }

  }



  async initSave(QuoteCard) {
    if (await this.helper.has_Permission("read") && await this.helper.has_Permission("write"))
      this.saveIt(QuoteCard);
    else {
      let alert = this.helper.normalAlert("Quote Factory require storage permission to save quotes to storage.", "Info")
      alert.present();
      alert.onDidDismiss(async (data) => {
        await this.helper.askForSoragePermissions();
        if (!await this.helper.has_Permission("read") || ! await this.helper.has_Permission("write")) {
          let alert = this.helper.normalAlert("Permission denied.! Some of the feature of the app may not work properly.", "Important")
          alert.present();
        }
        else {
          this.saveIt(QuoteCard);
        }
      });
    }
  }


  saveIt(QuoteCard) {
    this.helper.showToast("Preparing image for downloading.");
    setTimeout(() => {
      html2canvas(QuoteCard).then((canvas) => {
        //let arraybuffer = await 
        this.helper.watermarkedDataURL(canvas, this.mysetting.isPro ? "" : "Quote Factory", "arraybuffer").then((data) => {
          this.myfileManager.SaveImageToDir("Quote Factory", data).then((data) => { console.log("successfully saved."); this.downlodCount++; if (this.downlodCount % 3 == 0) this.adMob.showAdInterstitial(); }).catch((error) => console.log("error while shared =>", error));
        });
      }).catch((error) => { console.log("error while creating canvas =>" + error) });
    }, 250);
  }


  share(quote: Quote, QuoteCard) {
    this.helper.showToast("Preparing image for sharing.");
    setTimeout(() => {
      html2canvas(QuoteCard).then(async (canvas) => {
        this.helper.watermarkedDataURL(canvas, this.mysetting.isPro ? "" : "Quote Factory").then((data) => {
          this.socialShare.share(quote.QT + " - ( " + quote.AU + " ) . \n Shared via Quote Factory.", "Quote from Quote Factory", data, "http://bit.ly/QuoteFactory").then((data) => { console.log("successfully shared."); this.shareCount++; if (this.shareCount % 3 == 0) this.adMob.showAdInterstitial(); }).catch((error) => console.log("error while shared =>", error));
        });
      }).catch((error) => { console.log("error while creatin canvas =>" + error) });
    }, 250);
  }



  async removeFromQOTD(quote: Quote) {

    let t = this.toastCtrl.create({
      message: 'The quote is being deleted',
      showCloseButton: true,
      closeButtonText: 'Undo'
    });
    let closedByTimeout = false;
    let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 5000);
    t.onDidDismiss(() => {
      if (closedByTimeout) {
        this.quotesManager.removeQuoteFromAllQuotesOfTheDay(quote.QT);
        for (var i = this.AllQuotesOfTheDay.length - 1; i >= 0; i--) {
          if (this.AllQuotesOfTheDay[i].QT.toLocaleLowerCase().includes(quote.QT.toLowerCase())) {
            this.AllQuotesOfTheDay.splice(i, 1);
            this.quotesManager.removeQuoteFromAllQuotesOfTheDay(quote.QT);
            // this.helper.showToast("Deleted!")
          }

        }
        return;
      };
      clearTimeout(timeoutHandle);
      // Dismiss manually
      console.log('dismiss manually');
    });
    t.present();
  }


  copyToClipboard(quote: Quote) {
    let Message = "";
    if (this.helper.copyToClipboard(quote.QT))
      Message = "Successfully copied.";
    else
      Message = "Opss..some unexpected error occurred!";
    this.helper.showToast(Message);

  }
}
