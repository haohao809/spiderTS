
import superagent from 'superagent'
import cheerio from 'cheerio'
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
        const $ = cheerio.load(html);
        if($('script')[11].children[0].data) {
            this.data = ($('script')[11].children[0].data);
            if(this.data) {
                const sumData = JSON.parse(this.data);
                 if(sumData) {
                     console.log(sumData.component[0].summaryDataIn);
                 }
             }
        }

        
    }
}
const spider = new Spider();