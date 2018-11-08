import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Quote } from '../../utility/data-interface';
import { QuotesManager } from '../../utility/QuotesManager';
import { PopoverPage } from '../popover/popover';
import { QuotePage } from '../quote/quote';
import { AdMob } from './../../utility/ADMob';
import { Helper } from './../../utility/Helper';



@Component({
  selector: 'page-liked',
  templateUrl: 'liked.html',
})
export class LikedPage {

  LikedQuotes: Quote[] = [];

  isSpeaking = false;
  speakingQuoteIndex = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quotesManager: QuotesManager,
    private modalCtrl: ModalController,
    private adMob: AdMob,
    private helper: Helper,
    public popoverCtrl: PopoverController) {

  }

  async ionViewWillEnter() {
    this.LikedQuotes = await this.quotesManager.getAllLikedQuotes();
    this.adMob.shouldBannerBeVisible = true;
    setTimeout(() => { this.adMob.showAdBanner(); }, 3000);
  }





  async SpeakAll() {
    this.isSpeaking = !this.isSpeaking;
    let index = 0;

    for (let item of this.LikedQuotes) {
      index++;
      if (this.speakingQuoteIndex <= index && this.isSpeaking) {
        let b = document.getElementById("" + item.ID);
        if (b) b.scrollIntoView({ block: 'start', behavior: 'smooth' });
        await this.helper.readIt(item.QT + " by " + item.AU);
        this.speakingQuoteIndex = index;
      }
      if (index == this.LikedQuotes.length - 1)
        this.isSpeaking = false;
    }
  }



  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {}, { cssClass: 'popover-class' });
    popover.present({
      ev: myEvent
    });
  }



  showQuoteModel(quote: Quote) {
    
    this.isSpeaking = false;
    const modal = this.modalCtrl.create(QuotePage, quote, { cssClass: "quote-modal", showBackdrop: true, enableBackdropDismiss: true });

    // this.adMob.shouldBannerBeVisible = false;
    // setTimeout(() => { this.adMob.hideAdBanner(); }, 1000);

    modal.present();
    modal.onDidDismiss(async (remove: boolean) => {

      // this.adMob.shouldBannerBeVisible = true;
      // setTimeout(() => { this.adMob.showAdBanner(); }, 3000);

      this.LikedQuotes = await this.quotesManager.getAllLikedQuotes();

    });
  }


}
