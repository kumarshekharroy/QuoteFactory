import { Injectable } from "@angular/core";
import { AndroidFullScreen } from "@ionic-native/android-full-screen";

@Injectable()
export class FullScreenSettings {
  constructor(private androidFullScreen: AndroidFullScreen) {
  }
  async goToFullScreen() {
    let response = false;
    await this.androidFullScreen.isImmersiveModeSupported()
      .then(() => { this.androidFullScreen.immersiveMode(); response = true })
      .catch((error: any) => console.log(error));
    return response;
  }

  async showSystemUI() {
    let response = true;
    await this.androidFullScreen.showSystemUI().catch((error: any) => { console.log(error); response = true });
    return response;
  }

  async  leanMode() {
    let response = true;
    await this.androidFullScreen.leanMode().catch((error: any) => { console.log(error); response = true });
    return response;
  }

  showUnderStatusBar() {
    this.androidFullScreen.showUnderStatusBar().catch((error: any) => console.log(error));
  }

  showUnderSystemUI() {
    this.androidFullScreen.showUnderSystemUI().catch((error: any) => console.log(error));
  }
}