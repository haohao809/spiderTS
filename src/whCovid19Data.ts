import superagent from 'superagent'
import cheerio from 'cheerio'

export default class WhCovid19Data {
    private data: string|undefined;
    construct(html:string) {
        // this.getHtmlContent(html);
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
    public handleData(html:string) {
        this.getHtmlContent(html)
    }
}