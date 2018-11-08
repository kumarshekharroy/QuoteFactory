import { Injectable } from "@angular/core";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { AlertController, LoadingController, ToastController } from "ionic-angular";
import { SettingsManager } from './SettingsManager';


@Injectable()
export class Helper {
    loader: any;
    constructor(private tts: TextToSpeech,
        public alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private androidPermissions: AndroidPermissions,
        public loadingCtrl: LoadingController, private settings: SettingsManager) { }

    base64ToArrayBuffer(base64: string): ArrayBuffer {
        var binary_string = window.atob(base64.split(',')[1]);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    watermarkedDataURL(canvas, text: string, type: string = "base64"): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                var tempCanvas = document.createElement('canvas');
                var tempCtx = tempCanvas.getContext('2d');
                var cw, ch;
                cw = tempCanvas.width = canvas.width / 1.25;
                ch = tempCanvas.height = canvas.height / 1.25;
                tempCtx.drawImage(canvas, 0, 0, cw, ch);
                tempCtx.font = "20px verdana";
                var textWidth = tempCtx.measureText(text).width;
                tempCtx.globalAlpha = .50;
                tempCtx.fillStyle = 'white'
                tempCtx.fillText(text, cw - textWidth - 10, ch - 20);
                tempCtx.fillStyle = 'black'
                tempCtx.fillText(text, cw - textWidth - 10 + 2, ch - 20 + 2);
                // just testing by adding tempCanvas to document
                document.body.appendChild(tempCanvas);
                let base64 = tempCanvas.toDataURL('image/jpeg', 0.75);
                if (type == "base64")
                    resolve(base64);
                else if (type == "blob")
                    resolve(this.b64toBlob(base64, "jpeg"));
                else if (type == "arraybuffer")
                    resolve(this.base64ToArrayBuffer(base64));

            } catch (err) {
                reject(err);
            }
        });
    }

    copyToClipboard(value: string): boolean {
        //var copyText = document.getElementById("pwd_spn");
        try {
            var textArea = document.createElement("textarea");
            textArea.value = value;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    b64toBlob(b64Data: string, contentType: string): Blob {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    showToast(Message: string, duration: number = 2000, position: string = 'bottom') {
        let toast = this.toastCtrl.create({
            message: Message,
            duration: duration,
            position: position
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    showLoader(Message: string, duration: number = 2000) {
        this.loader = this.loadingCtrl.create({
            content: Message,
            duration: duration,
            spinner: "ios"
        });
        this.loader.present();
    }
    hideLoader() {
        this.loader.dismiss();
    }

    randomNumFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    normalAlert(Message: string, Title: string = null, button: string = 'OK') {
        const alert = this.alertCtrl.create({
            title: Title,
            subTitle: Message,
            enableBackdropDismiss: false,
            buttons: [{
                text: button,
                handler: () => {
                    return true
                }
            }]
        });
        return alert;
    }

    async readIt(Message: string, rate: number = .85) {
        let mysetting = await this.settings.getSettings();
        await this.tts.speak({
            text: Message,
            locale: (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language,
            rate: mysetting.speakSpeed
        }).catch((error) => console.log("error while reading =>", error));
        //.then((data) => console.log("successfully read.")).catch((error) => console.log("error while reading =>", error));
        return true;
    }

    async has_Permission(type: string = "read"): Promise<boolean> {
        let hasPermission: boolean = false;
        var result: any;
        switch (type) {
            case "read":
                result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).catch((err) => { hasPermission = false });
                hasPermission = result.hasPermission == true ? true : false;
                break;
            case "write":
                result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).catch((err) => { hasPermission = false });
                hasPermission = result.hasPermission == true ? true : false;
                break;
            case "camera":
                result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).catch((err) => { hasPermission = false });
                hasPermission = result.hasPermission == true ? true : false;
                break;
            default:
                hasPermission = false;

        }
        return hasPermission;
    }
    async askForPermission(type: string = "camera"): Promise<boolean> {
        let hasPermission: boolean = false;
        switch (type) {
            case "camera":
                await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).catch((err) => { hasPermission = false });
                break;
            default:
                hasPermission = false;
        }
        hasPermission = await this.has_Permission(type);
        return hasPermission;
    }
    async askForSoragePermissions() {
        await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]).catch((err) => { this.showToast("askForSoragePermissions =>" + JSON.stringify(err)) });
    }
}