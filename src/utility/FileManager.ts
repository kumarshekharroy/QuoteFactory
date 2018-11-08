import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Helper } from './Helper';

@Injectable()
export class MyFileManager {
    constructor(private file: File, private helper: Helper) {
    }


    async SaveImage(dirName: string, arraybuffer: ArrayBuffer) {
        try {
            if (await this.helper.has_Permission("read") && await this.helper.has_Permission("write")) {
                this.SaveImageToDir(dirName, arraybuffer);
            }
            else {
                let alert = this.helper.normalAlert("You will be prompt to grant permission to access storage.Please allow it to proceed furthur.", "Important")
                alert.present();
                alert.onDidDismiss(async (data) => {
                    await this.helper.askForSoragePermissions();
                    if (!await this.helper.has_Permission("read") || ! await this.helper.has_Permission("write")) {
                        let alert = this.helper.normalAlert("Storage permission denied.! Some of the features of the app may not work properly.", "Important")
                        alert.present();
                    }
                    else {
                        this.SaveImageToDir(dirName, arraybuffer);
                    }
                });
            }
        }
        catch (ex) {
            console.log("SaveImage =>", JSON.stringify(ex));
        }
    }

    async SaveImageToDir(dirName: string, arraybuffer: ArrayBuffer) {
        try {
            if (await this.file.checkDir(this.file.externalRootDirectory, dirName).catch(err => { console.log("No directory with name " + dirName + " found! Creating one for you.") }) || await this.file.createDir(this.file.externalRootDirectory, dirName, true).catch(err => { console.log("Error while creating direcory.") })) {
                let name = 'QF_' + new Date().toISOString().substr(0, 19).replace('T', ' ').split(":").join("") + '.jpg';
                this.file.writeFile(this.file.externalRootDirectory + dirName, name, arraybuffer, { replace: true }).then((data) => {
                    this.helper.showToast("Successfully downloaded to Quote Factory folder.", 1000);
                }).catch(err => {
                    this.helper.showToast("Opss..Unexpected error while downloading.", 5000);
                });
            }
        }
        catch (ex) {
            this.helper.showToast("Opss..Unexpected error while processing your request.", 5000);
        }
    }
}