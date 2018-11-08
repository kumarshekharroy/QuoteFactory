import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as html2canvas from 'html2canvas';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Quote, Settings } from '../../utility/data-interface';
import { Helper } from '../../utility/Helper';
import { QuotesManager } from '../../utility/QuotesManager';
import { SettingsManager } from '../../utility/SettingsManager';
import { AdMob } from './../../utility/ADMob';
import { MyFileManager } from './../../utility/FileManager';
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {
  selectedquote: Quote;

  downlodCount: 0;
  shareCount: 0;

  mysetting: Settings;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quotesManager: QuotesManager,
    private helper: Helper,
    private socialShare: SocialSharing,
    public myfileManager: MyFileManager,
    private adMob: AdMob,
    private viewCtrl: ViewController,
    private settings: SettingsManager) {
    this.selectedquote = this.navParams.data;
  }

  async ionViewWillEnter() {

    this.mysetting = await this.settings.getSettings();
  }
  closeModal(remove: boolean) {
    this.viewCtrl.dismiss(remove);
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
