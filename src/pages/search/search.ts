import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Quote } from '../../utility/data-interface';
import { QuotesManager } from '../../utility/QuotesManager';
import { QuotePage } from '../quote/quote';
import { AdMob } from './../../utility/ADMob';
import { Helper } from './../../utility/Helper';




@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  shouldShowCancel: boolean = false;
  searchKey: string = "";

  QuotesBasedOnTag: Quote[] = [];
  QuotesBasedOnAuthor: Quote[] = [];
  QuotesBasedOnQuote: Quote[] = [];

  constructor(public navCtrl: NavController,
    private adMob: AdMob, public navParams: NavParams,
    private quotesManager: QuotesManager,
    private modalCtrl: ModalController,
    private helper: Helper) {

    this.adMob.shouldBannerBeVisible = true;
    setTimeout(() => { this.adMob.showAdBanner(); }, 5000);
    if (navParams.get("searchKey") != undefined) {
      this.searchKey = navParams.get("searchKey");
      this.searchItems();
    }
  }

  async searchItems() {
    if (this.searchKey == null || this.searchKey.trim() == "") {
      this.shouldShowCancel = false;
      this.QuotesBasedOnAuthor = [];
      this.QuotesBasedOnQuote = [];
      this.QuotesBasedOnTag = [];
    }
    else if (this.searchKey.trim().length >= 2) {
      this.helper.showLoader("Getting quotes for you");
      this.shouldShowCancel = true;
      this.quotesManager.searchQuoteByAuthor(this.searchKey.trim()).then((data) => {
        this.QuotesBasedOnAuthor = data;
      });
      this.quotesManager.searchQuoteByQuote(this.searchKey.trim()).then((data) => {
        this.QuotesBasedOnQuote = data;
      });
      this.quotesManager.searchQuoteByTag(this.searchKey.trim()).then((data) => {
        this.QuotesBasedOnTag = data;
      });
      this.helper.hideLoader();
    }
  }



  showQuoteModel(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote, { cssClass: "quote-modal", showBackdrop: true, enableBackdropDismiss: true });

    // this.adMob.shouldBannerBeVisible = false;
    // setTimeout(() => { this.adMob.hideAdBanner(); }, 1000);

    modal.present();
    modal.onDidDismiss((remove: boolean) => {

      // this.adMob.shouldBannerBeVisible = true;
      // setTimeout(() => { this.adMob.showAdBanner(); }, 3000);

    });
  }


}
