
export interface Quote {
    ID: number,
    QT: string,
    TG: string,
    AU: string,
    Avatar: string,
    BG: string,
    T: number,
    isLiked: boolean,
    isFav: boolean
}

export interface Settings {
    isPro: boolean,
    ProValidTill: number,

    isFullScreen: boolean,

    isDarkMode: boolean,

    isSyncedWithFirebase: boolean,
    SyncedWithFirebaseOn: number,
    isPushNotificationsEnabled: boolean,

    isShakeModeEnabled: boolean,
    shakeIntensity: number,
    speakSpeed: number

}