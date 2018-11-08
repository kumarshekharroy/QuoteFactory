import { Component } from '@angular/core';
import { Shake } from '@ionic-native/shake';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as html2canvas from 'html2canvas';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Quote } from '../../utility/data-interface';
import { QuotesManager } from '../../utility/QuotesManager';
import { PopoverPage } from '../popover/popover';
import { AdMob } from './../../utility/ADMob';
import { Settings } from './../../utility/data-interface';
import { MyFileManager } from './../../utility/FileManager';
import { Helper } from './../../utility/Helper';
import { SettingsManager } from './../../utility/SettingsManager';
import { SearchPage } from './../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {




  AllQuotes: Quote[] = [];
  pageIndex: number = -1;
  pageSize: number = 20;

  downlodCount: number = 0;
  shareCount: number = 0;
  shakeCount: number = 0;

  isViewInFront = false;
  isValidShake = true;

  isSpeaking = false;
  speakingQuoteIndex = 0;

  mysetting: Settings;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quotesManager: QuotesManager,
    private helper: Helper,
    private socialShare: SocialSharing,
    public myfileManager: MyFileManager,
    private adMob: AdMob,
    public popoverCtrl: PopoverController,
    private settings: SettingsManager,
    private shake: Shake
  ) {

  }

  ionViewWillLoad() {
    this.loadQuotes();
  }
  ionViewWillEnter() {
    this.isViewInFront = true;
    this.shakeDetector();

    this.adMob.shouldBannerBeVisible = false;
    setTimeout(() => { this.adMob.hideAdBanner(); });

  }
  ionViewWillLeave() {
    this.isViewInFront = false;
  }
  showQuotesByAuthor(searchKey: string) {
    this.navCtrl.push(SearchPage, { searchKey: searchKey });
  }

  async SpeakAll() {
    this.isSpeaking = !this.isSpeaking;
    let index = 0;

    for (let item of this.AllQuotes) {
      index++;
      if (this.speakingQuoteIndex <= index && this.isSpeaking) {
        let b = document.getElementById("" + item.ID);
        if (b) b.scrollIntoView({ block: 'start', behavior: 'smooth' });
        await this.helper.readIt(item.QT + " by " + item.AU);
        this.speakingQuoteIndex = index;
      }
      if (index == this.AllQuotes.length - 1)
        this.isSpeaking = false;
    }
  }

  async shakeDetector() {
    try {
      this.mysetting = await this.settings.getSettings();
      this.shake.startWatch(this.mysetting.shakeIntensity).subscribe(async () => {
        if (!this.isViewInFront)
          return;
        setTimeout(() => { this.isValidShake = true }, 5000);
        if (this.isValidShake) {
          this.mysetting = await this.settings.getSettings();
          if (this.mysetting.isShakeModeEnabled) {
            this.helper.showLoader("Shuffling", 10000);
            this.shakeCount++;
            this.pageIndex = 0;
            this.speakingQuoteIndex = 0;
            this.quotesManager.AllQuotes = [];
            this.loadQuotes();

            if (this.shakeCount % 3 == 0)
              this.adMob.showAdInterstitial();

            this.helper.hideLoader();

          }
          this.isValidShake = false;
        }
      });
    } catch (err) {
      console.log("Exception in shakeDetector", err);
    }

  }





  async loadQuotes(infiniteScroll?) {
    let data = await this.quotesManager.getAllQuotesByTakeSkip(this.pageIndex * this.pageSize, this.pageSize);
    if (infiniteScroll == undefined)
      this.AllQuotes = [];

    this.AllQuotes = this.AllQuotes.concat(data);
    if (infiniteScroll != undefined && (data == null || data.length < this.pageSize))
      infiniteScroll.enable(false);
    if (infiniteScroll) {
      infiniteScroll.complete();
    }
  }


  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.pageIndex++;
      this.loadQuotes(infiniteScroll);
      if (this.pageIndex > 0 && this.pageIndex % 3 == 0)
        this.adMob.showAdInterstitial();
    }, 250);
  }



  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {}, { cssClass: 'popover-class' });
    popover.present({
      ev: myEvent
    });
  }



  count: number = 0;
  doubleTap(quote: Quote) {
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        quote.BG = this.quotesManager.getRandomImage("background");
      } if (this.count > 1) {
        this.count = 0;
        this.addToLiked(quote);
      }
    }, 250);
  }
  swiped(quote: Quote) {
    quote.BG = this.quotesManager.getRandomImage("background");
  }

  async isLikedOrFav(quote: Quote) {
    let IsFavPromise = this.quotesManager.isFav(quote.ID);
    let IsLikedPromise = this.quotesManager.isLiked(quote.ID);
    quote.isFav = await IsFavPromise;
    quote.isLiked = await IsLikedPromise;
  }

  async removeFromFav(quote: Quote) {
    quote.isFav = false;
    this.quotesManager.removeQuoteFromFav(quote.ID);
  }

  async addToFav(quote: Quote) {
    quote.isFav = true;
    this.quotesManager.addQuoteToFav(quote);
  }

  async removeFromLiked(quote: Quote) {
    quote.isLiked = false;
    this.quotesManager.removeQuoteFromLiked(quote.ID);
  }

  async addToLiked(quote: Quote) {
    quote.isLiked = true;
    this.quotesManager.addQuoteToLiked(quote);
  }

  readTheQuote(quote: Quote) {
    this.isSpeaking = false;
    this.helper.readIt(quote.QT);
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



  copyToClipboard(quote: Quote) {
    let Message = "";
    if (this.helper.copyToClipboard(quote.QT))
      Message = "Successfully copied.";
    else
      Message = "Opss..some unexpected error occurred!";
    this.helper.showToast(Message);

  }
}
