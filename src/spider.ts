
import superagent from 'superagent'
import cheerio from 'cheerio'
import WhCovid19Data from './WhCovid19Data';
class Spider {
    private url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_1"
    private data: string|undefined;
    constructor () {
        this.getHtml();
        console.log('constructor');
    }
    async getHtml() {
       const res = await superagent.get(this.url)
    //    console.log(res.text);
       this.getHtmlContent(res.text);
    }
    getHtmlContent(html :string) {

        whCovid19Data.handleData(html);
        
    }
}

const spider = new Spider();
const whCovid19Data = new WhCovid19Data();