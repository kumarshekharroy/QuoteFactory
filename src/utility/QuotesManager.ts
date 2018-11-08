
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';
import { List } from 'linqts';
import 'rxjs/Rx';
import { Quote } from "./data-interface";


@Injectable()
export class QuotesManager {
    public AllQuotes: Quote[] = [];
    private AllLikedQuotes: Quote[] = [];
    private AllFavQuotes: Quote[] = [];
    private AllQuotesOfTheDay: Quote[] = [];

    constructor(private http: Http, private storage: Storage) { 

        const mylist= new List<number>();
    }

    randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    ImageArrayAvatar: string[] = [
        'assets/img/avatar/1.png',
        'assets/img/avatar/2.png',
        'assets/img/avatar/3.png',
        'assets/img/avatar/4.png',
        'assets/img/avatar/5.png',
        'assets/img/avatar/6.png',
        'assets/img/avatar/7.png',
        'assets/img/avatar/8.png',
        'assets/img/avatar/9.png',
        'assets/img/avatar/10.png',
        'assets/img/avatar/11.png',
        'assets/img/avatar/12.png',
        'assets/img/avatar/13.png',
        'assets/img/avatar/14.png',
        'assets/img/avatar/15.png',
        'assets/img/avatar/16.png',
        'assets/img/avatar/17.png',
        'assets/img/avatar/18.png',
        'assets/img/avatar/19.png',
        'assets/img/avatar/20.png',
        'assets/img/avatar/21.png',
        'assets/img/avatar/22.png',
        'assets/img/avatar/23.png',
        'assets/img/avatar/24.png',
        'assets/img/avatar/25.png',
        'assets/img/avatar/26.png',
        'assets/img/avatar/27.png',
        'assets/img/avatar/28.png',
        'assets/img/avatar/29.png',
        'assets/img/avatar/30.png',
        'assets/img/avatar/31.png',
        'assets/img/avatar/32.png',
        'assets/img/avatar/33.png',
        'assets/img/avatar/34.png',
        'assets/img/avatar/35.png',
        'assets/img/avatar/36.png',
    ]

    ImageArrayBackground: string[] = [
        'assets/img/background/1.jpg',
        'assets/img/background/2.jpg',
        'assets/img/background/3.jpg',
        'assets/img/background/4.jpg',
        'assets/img/background/5.jpg',
        'assets/img/background/6.jpg',
        'assets/img/background/7.jpg',
        'assets/img/background/8.jpg',
        'assets/img/background/9.jpg',
        'assets/img/background/10.jpg',
        'assets/img/background/11.jpg',
        'assets/img/background/12.jpg',
        'assets/img/background/13.jpg',
        'assets/img/background/14.jpg',
        'assets/img/background/15.jpg',
        'assets/img/background/16.jpg',
        'assets/img/background/17.jpg',
        'assets/img/background/18.jpg',
        'assets/img/background/19.jpg',
        'assets/img/background/20.jpg',
        'assets/img/background/21.jpg',
        'assets/img/background/22.jpg',
        'assets/img/background/23.jpg',
        'assets/img/background/24.jpg',
        'assets/img/background/25.jpg',
        'assets/img/background/26.jpg',
        'assets/img/background/27.jpg',
        'assets/img/background/28.jpg',
        'assets/img/background/29.jpg',
        'assets/img/background/30.jpg',
        'assets/img/background/31.jpg',
        'assets/img/background/32.jpg',
        'assets/img/background/33.jpg',
        'assets/img/background/34.jpg',
        'assets/img/background/35.jpg',
        'assets/img/background/36.jpg',
        'assets/img/background/37.jpg',
        'assets/img/background/38.jpg',
        'assets/img/background/39.jpg',
        'assets/img/background/40.jpg',
        'assets/img/background/41.jpg',
        'assets/img/background/42.jpg',
        'assets/img/background/44.jpg',
        'assets/img/background/44.jpg',
        'assets/img/background/45.jpg',
        'assets/img/background/46.jpg',
        'assets/img/background/47.jpg',
        'assets/img/background/48.jpg',
        'assets/img/background/49.jpg',
        'assets/img/background/50.jpg',
        'assets/img/background/51.jpg',
        'assets/img/background/52.jpg',
    ]

    public AllQuotesTemp: Quote[] = [
        {
            "ID": 2,
            "QT": "If you want to shine like a sun, first burn like a sun.",
            "TG": "Sun,Shine,You,Burn,Want,First",
            "AU": "A. P. J. Abdul Kalam",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 4,
            "QT": "Let us sacrifice our today so that our children can have a better tomorrow.",
            "TG": "Inspirational,Children,Today,Tomorrow",
            "AU": "A. P. J. Abdul Kalam",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 6,
            "QT": "To succeed in your mission, you must have single-minded devotion to your goal.",
            "TG": "Goal,You,Mission,Succeed,Devotion",
            "AU": "A. P. J. Abdul Kalam",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 10,
            "QT": "Small aim is a crime; have great aim.",
            "TG": "Great,Small,Crime,Aim",
            "AU": "A. P. J. Abdul Kalam",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 18,
            "QT": "Great dreams of great dreamers are always transcended.",
            "TG": "Dreams,Great,Dreamers,Always",
            "AU": "A. P. J. Abdul Kalam",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 20,
            "QT": "All that I am, or hope to be, I owe to my angel mother.",
            "TG": "Hope,Mother,I Am,Mother's Day,Angel",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 23,
            "QT": "No man has a good enough memory to be a successful liar.",
            "TG": "Funny,Good,Man,Memory,Liar,Enough",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 24,
            "QT": "I am a slow walker, but I never walk back.",
            "TG": "Walk,I Am,Slow,Back,Never,Walker",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {

            "ID": 25,
            "QT": "Be sure you put your feet in the right place, then stand firm.",
            "TG": "Strength,Stand,Feet,You,Place,Right",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {

            "ID": 31,
            "QT": "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
            "TG": "Tree,Me,Down,Will,First,Four",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 33,
            "QT": "The ballot is stronger than the bullet.",
            "TG": "Politics,Stronger,Bullet,Than,Ballot",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 37,
            "QT": "Whatever you are, be a good one.",
            "TG": "Good,You,Whatever",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 41,
            "QT": "A house divided against itself cannot stand.",
            "TG": "Stand,House,Divided,Against,Cannot",
            "AU": "Abraham Lincoln",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 42,
            "QT": "Look deep into nature, and then you will understand everything better.",
            "TG": "Nature,Deep,Better,You,Look,Will",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 44,
            "QT": "Life is like riding a bicycle. To keep your balance, you must keep moving.",
            "TG": "Life,Balance,Moving,Bicycle,You",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 46,
            "QT": "The true sign of intelligence is not knowledge but imagination.",
            "TG": "Knowledge,Imagination,Intelligence",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 47,
            "QT": "Try not to become a man of success, but rather try to become a man of value.",
            "TG": "Success,Man,Value,Try,Become,Rather",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 48,
            "QT": "I have no special talent. I am only passionately curious.",
            "TG": "Education,I Am,Talent,Curious,Only",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 53,
            "QT": "We cannot solve our problems with the same thinking we used when we created them.",
            "TG": "Thinking,Problems,Used,Same,Cannot",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 55,
            "QT": "The only source of knowledge is experience.",
            "TG": "Knowledge,Experience,Source,Only",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 57,
            "QT": "Anyone who has never made a mistake has never tried anything new.",
            "TG": "Mistake,New,Never,Anything,Made,Who",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 60,
            "QT": "Logic will get you from A to B. Imagination will take you everywhere.",
            "TG": "Imagination,You,Logic,Will,Take,Get",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 64,
            "QT": "Once we accept our limits, we go beyond them.",
            "TG": "Limits,Brainy,Accept,Go,Beyond,Once",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 67,
            "QT": "Peace cannot be kept by force; it can only be achieved by understanding.",
            "TG": "Peace,Understanding,Only,Force,Kept",
            "AU": "Albert Einstein",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 69,
            "QT": "You can change friends but not neighbours.",
            "TG": "Change,Friends,You,Neighbours",
            "AU": "Atal Bihari Vajpayee",
            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {

            "ID": 101,
            "QT": "Everything that is done in the world is done by hope.",
            "TG": "Hope,World,Done,Everything",
            "AU": "Martin Luther",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 105,
            "QT": "Faith is taking the first step even when you don't see the whole staircase.",
            "TG": "Faith,Step,First Step,You,Staircase",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 106,
            "QT": "We must accept finite disappointment, but never lose infinite hope.",
            "TG": "Hope,Disappointment,Lose,Infinite",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 107,
            "QT": "We are not makers of history. We are made by history.",
            "TG": "History,Made,Makers",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 110,
            "QT": "The time is always right to do what is right.",
            "TG": "Time,Brainy,Always,Right",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 109,
            "QT": "Nothing in all the world is more dangerous than sincere ignorance and conscientious stupidity.",
            "TG": "Ignorance,Stupidity,World,More,Than",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 115,
            "QT": "Injustice anywhere is a threat to justice everywhere.",
            "TG": "Justice,Injustice,Threat,Everywhere",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 122,
            "QT": "There can be no deep disappointment where there is not deep love.",
            "TG": "Love,Disappointment,Deep,Where",
            "AU": "Martin Luther King, Jr.",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 124,
            "QT": "Try to be a rainbow in someone's cloud.",
            "TG": "Inspirational,Rainbow,Cloud,Try",
            "AU": "Maya Angelou",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 123,
            "QT": "If you don't like something, change it. If you can't change it, change your attitude.",
            "TG": "Change,Attitude,You,Like,Something",
            "AU": "Maya Angelou",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 127,
            "QT": "When someone shows you who they are, believe them the first time.",
            "TG": "Relationship,Time,Believe,You,First",
            "AU": "Maya Angelou",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {
            "ID": 129,
            "QT": "If you have only one smile in you give it to the people you love.",
            "TG": "Love,Smile,People,You,Only,Give",
            "AU": "Maya Angelou",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },
        {

            "ID": 135,
            "QT": "Love is like a virus. It can happen to anybody at any time.",
            "TG": "Love,Time,Love Is,Dating,Happen,Any",
            "AU": "Maya Angelou",

            "Avatar": this.getRandomImage("avatar"),
            "BG": this.getRandomImage("background"),
            "T": new Date().getTime(),
            "isFav": false,
            "isLiked": false,
        },

    ];

    getRandomImage(Type: string = "background"): string {
        if (Type.toLowerCase() == "background")
            return this.ImageArrayBackground[this.randomIntFromInterval(0, this.ImageArrayBackground.length - 1)]
        else if (Type.toLowerCase() == "avatar")
            return this.ImageArrayAvatar[this.randomIntFromInterval(0, this.ImageArrayAvatar.length - 1)]
    }


    async  getAllQuotes(): Promise<Quote[]> {
        if (this.AllQuotes.length > 0)
            return this.AllQuotes;
        let _data: Quote[] = await this.storage.get("AllQuotes").catch(error => console.log('get AllQuotes from storage.', error));
        if (_data != null && _data.length > 0) {
            this.AllQuotes = new List<Quote>(_data).OrderBy(x => this.randomIntFromInterval(1, _data.length)).ToArray();
            return this.AllQuotes;
        }
        else {
            let data: Quote[] = await this.http.get("./assets/json/Quote.json").map(res => res.json()).toPromise().catch((err) => { console.log('get AllQuotes from json.', err) });//.subscribe((data: Quote[]) => {
            data.forEach(x => {
                x.BG = this.getRandomImage("background"),
                    x.Avatar = this.getRandomImage("avatar")
            });
            this.storage.set("AllQuotes", data).catch(error => console.log('set AllQuotes to storage.', error));

            this.AllQuotes = new List<Quote>(data).OrderBy(x => this.randomIntFromInterval(1, data.length)).ToArray();
            return this.AllQuotes;
        }
    }


    async getRandomQuote(count: number = 100): Promise<Quote[]> {
        return new List<Quote>(await this.getAllQuotes()).OrderBy(x => this.randomIntFromInterval(1, 500)).Take(count).ToArray();
    }

    async searchQuoteByKey(key: string = ""): Promise<Quote[]> {
        return new List<Quote>(await this.getAllQuotes()).Where(x =>
            x.AU.toLocaleLowerCase().includes(key.toLocaleLowerCase()) ||
            x.TG.toLocaleLowerCase().includes(key.toLocaleLowerCase()) ||
            x.QT.toLocaleLowerCase().includes(key.toLocaleLowerCase())
        ).Take(50).ToArray();
    }


    async searchQuoteByQuote(key: string = ""): Promise<Quote[]> {
        return new List<Quote>(await this.getAllQuotes()).Where(x =>
            x.QT.toLocaleLowerCase().includes(key.toLocaleLowerCase())
        ).Take(100).ToArray();
    }

    async searchQuoteByTag(key: string = ""): Promise<Quote[]> {
        return new List<Quote>(await this.getAllQuotes()).Where(x => x.TG != null &&
            x.TG.toLocaleLowerCase().includes(key.toLocaleLowerCase())
        ).Take(100).ToArray();
    }

    async searchQuoteByAuthor(key: string = ""): Promise<Quote[]> {
        return new List<Quote>(await this.getAllQuotes()).Where(x =>
            x.AU.toLocaleLowerCase().includes(key.toLocaleLowerCase())
        ).Take(100).ToArray();
    }

    async searchQuoteByID(ID: number = 0): Promise<Quote> {
        return new List<Quote>(await this.getAllQuotes()).FirstOrDefault(x => x.ID == ID);
    }


    async getAllQuotesByTakeSkip(skip: number = 0, take: number = 100): Promise<Quote[]> {
        if (skip < 0) {
            let data: Quote[] = new List<Quote>(this.AllQuotesTemp).OrderBy(x => this.randomIntFromInterval(1, 500)).Take(10).ToArray(); //await this.storage.get("CachedQuotes").catch(error => console.log('get Cached QuoteList from storage.', error));
            if (data != null && data.length > 0)
                return data;
        }
        let QuoteList = new List<Quote>(await this.getAllQuotes()).Skip(skip).Take(take).ToArray();
        //this.storage.set("CachedQuotes", await this.getRandomQuote(25)).catch(error => console.log('set QuoteList to storage .', error));
        return QuoteList;
    }



    async  getAllFavQuotes(): Promise<Quote[]> {
        if (this.AllFavQuotes.length > 0)
            return new List<Quote>(this.AllFavQuotes).OrderByDescending(x => x.T).ToArray();
        let data: Quote[] = await this.storage.get("AllFavQuotes").catch(error => console.log('get AllFavQuotes from storage.', error));
        if (data != null && data.length > 0) {
            this.AllFavQuotes = new List<Quote>(data).OrderByDescending(x => x.T).ToArray();
        }
        return this.AllFavQuotes;
    }



    async addQuoteToFav(quote: Quote): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllFavQuotes());
        if (dataList.Any(x => x.ID == quote.ID))
            return true;

        quote.isFav = true;
        quote.T = new Date().getTime();
        dataList.Add(quote);
        this.AllFavQuotes = dataList.ToArray();
        this.storage.set("AllFavQuotes", this.AllFavQuotes).catch(error => console.log('set AllFavQuotes to storage After adding to fav.', error));
        return true;
    }


    async removeQuoteFromFav(ID: number): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllFavQuotes());
        let QuoteToBeRemoved = dataList.FirstOrDefault(x => x.ID == ID);
        if (QuoteToBeRemoved == null)
            return true;
        dataList.Remove(QuoteToBeRemoved);
        this.AllFavQuotes = dataList.ToArray();
        this.storage.set("AllFavQuotes", this.AllFavQuotes).catch(error => console.log('set AllFavQuotes to storage After removing from fav.', error))
        return true;
    }


    async  getAllLikedQuotes(): Promise<Quote[]> {
        if (this.AllLikedQuotes.length > 0)
            return new List<Quote>(this.AllLikedQuotes).OrderByDescending(x => x.T).ToArray();
        let data: Quote[] = await this.storage.get("AllLikedQuotes").catch(error => console.log('get AllLikedQuotes from storage.', error));
        if (data != null && data.length > 0) {
            this.AllLikedQuotes = new List<Quote>(data).OrderByDescending(x => x.T).ToArray();
        }
        return this.AllLikedQuotes;
    }

    async addQuoteToLiked(quote: Quote): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllLikedQuotes());
        if (dataList.Any(x => x.ID == quote.ID))
            return true;

        quote.isLiked = true;
        quote.T = new Date().getTime();
        dataList.Add(quote);
        this.AllLikedQuotes = dataList.ToArray();
        this.storage.set("AllLikedQuotes", this.AllLikedQuotes).catch(error => console.log('set AllLikedQuotes to storage After adding to fav.', error));
        // this.addQuoteToQuotesOfTheDay(quote.QT,quote.AU);
        return true;
    }


    async removeQuoteFromLiked(ID: number): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllLikedQuotes());
        let QuoteToBeRemoved = dataList.FirstOrDefault(x => x.ID == ID);
        if (QuoteToBeRemoved == null)
            return true;
        dataList.Remove(QuoteToBeRemoved);
        this.AllLikedQuotes = dataList.ToArray();
        this.storage.set("AllLikedQuotes", this.AllLikedQuotes).catch(error => console.log('set AllLikedQuotes to storage After removing from fav.', error))
        return true;
    }

    async  getAllQuotesOfTheDay(): Promise<Quote[]> {
        if (this.AllQuotesOfTheDay.length > 0)
            return this.AllQuotesOfTheDay;
        let data: Quote[] = await this.storage.get("AllQuotesOfTheDay").catch(error => console.log('get AllCustomQuotes from storage.', error));
        if (data != null && data.length > 0) {
            this.AllQuotesOfTheDay = new List<Quote>(data).OrderByDescending(x => x.T).ToArray();
        }
        return this.AllQuotesOfTheDay;
    }

    async addQuoteToQuotesOfTheDay(QT: string, AU: string = "Unknown"): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllQuotesOfTheDay());
        let QuoteToBeAdded = dataList.FirstOrDefault(x => x.QT.toLocaleLowerCase().includes(QT.toLocaleLowerCase()));
        if (QuoteToBeAdded != null)
            return true;
        QuoteToBeAdded =
            {
                ID: 0, QT: QT, TG: "", T: new Date().getTime(), BG: this.getRandomImage("background"),
                AU: AU, Avatar: this.getRandomImage("avatar"),
                isFav: false,
                isLiked: false
            };
        dataList.Add(QuoteToBeAdded);
        this.storage.set("AllQuotesOfTheDay", dataList.ToArray()).catch(error => console.log('set AllQuotesOfTheDay to storage after addning new quote.', error));
        return true;
    }


    async removeQuoteFromAllQuotesOfTheDay(QT: string): Promise<boolean> {
        let dataList = new List<Quote>(await this.getAllQuotesOfTheDay());
        let QuoteToBeRemoved = dataList.FirstOrDefault(x => x.QT.toLocaleLowerCase().includes(QT.toLocaleLowerCase()));
        if (QuoteToBeRemoved == null)
            return true;
        dataList.Remove(QuoteToBeRemoved);
        this.storage.set("AllQuotesOfTheDay", dataList.ToArray()).catch(error => console.log('set AllQuotesOfTheDay to storage After removing old quote.', error))
        return true;
    }


    async getAllQuotesOfTheDayByTakeSkip(skip: number = 0, take: number = 100): Promise<Quote[]> {

        let QuoteList = new List<Quote>(await this.getAllQuotesOfTheDay()).Skip(skip).Take(take).ToArray();
        return QuoteList;
    }


    async isLiked(ID: number): Promise<boolean> {
        return new List<Quote>(await this.getAllLikedQuotes()).Any(x => x.ID == ID);
    }

    async isFav(ID: number): Promise<boolean> {
        return new List<Quote>(await this.getAllLikedQuotes()).Any(x => x.ID == ID);
    }
}