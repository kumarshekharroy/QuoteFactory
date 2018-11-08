import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { AdMob } from './../../utility/ADMob';
 

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input("header") header: HTMLElement;
  scrollContent;
 

  constructor(public element: ElementRef, public renderer: Renderer, public adMob: AdMob) {
  }

  ngOnInit() {
    //header  
    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 250ms  ease-in-out');

    document.querySelector(".tabbar")['style'].webkitTransition = 'display 250ms ease-in-out';

    this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 250ms ease-in-out');
    this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-bottom 250ms ease-in-out');
  }

  onContentScroll(event) {
    if (event.scrollTop <= 60) {
      this.adMob.shouldBannerBeVisible = false;
      setTimeout(() => { this.adMob.hideAdBanner(); });

      this.renderer.setElementStyle(this.scrollContent, "margin-top", "56px");
      //this.renderer.setElementStyle(this.scrollContent, "margin-bottom", this.tabBarHeight + "px");

      //this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "0px");

      this.renderer.setElementStyle(this.header, "top", "0px");
      document.querySelector(".tabbar")['style'].display = 'flex';

      return
    }
    else if (event.scrollDirection = "up" && event.deltaY > 1) {

      this.renderer.setElementStyle(this.header, "top", "-56px");
      document.querySelector(".tabbar")['style'].display = 'none';

      this.renderer.setElementStyle(this.scrollContent, "margin-top", "0px");
      this.renderer.setElementStyle(this.scrollContent, "margin-bottom", "0px");
      //document.querySelector(".tabbar")['style'].display = 'flex'; 
      // this.renderer.setElementStyle(this.scrollContent, "margin-bottom", this.tabBarHeight + "px")

    } else if (event.scrollDirection = "down" && event.deltaY <= 0) {
      //show header 
      this.renderer.setElementStyle(this.header, "top", "0px");
      document.querySelector(".tabbar")['style'].display = 'flex';

      // this.renderer.setElementStyle(this.scrollContent, "margin-bottom", this.tabBarHeight + "px")
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "56px")
    }

    this.adMob.shouldBannerBeVisible = true;
    setTimeout(() => { this.adMob.showAdBanner(); }, 10000);

  }

}
