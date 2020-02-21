import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
interface SummaryData {
    confirmed: string,
    die: string,
    cured: string,
    relativeTime: string,
    curConfirm: string,
    unconfirmed: string
}
export default class WhCovid19Data {
    private data: string|undefined;
    private filePath = path.resolve(__dirname,'../data/data.json')
    construct(html:string) {
        // this.getHtmlContent(html);
    }
    getHtmlContent(html :string) : string{
        const $ = cheerio.load(html);
        if($('script')[11].children[0].data) {
            this.data = ($('script')[11].children[0].data);
            if(this.data) {
                const sumData = JSON.parse(this.data);
                 if(sumData) {
                     debugger;
                     console.log(sumData.component[0].summaryDataIn);
                     return this.parseData(sumData.component[0].summaryDataIn);
                 }
             }
        }  
        return ''
    }
    parseData(summaryData :SummaryData) : string{
        let dataJson = {};
        if(fs.existsSync(this.filePath)) {
            dataJson = JSON.parse(fs.readFileSync(this.filePath,'utf-8'))
        }
        dataJson = {
            '累计确诊' : summaryData.confirmed,
            '死亡人数' : summaryData.die,
            '治愈人数' : summaryData.cured,
            '当前确诊人数': summaryData.curConfirm,
            '疑似病例': summaryData.unconfirmed,
            '时间': summaryData.relativeTime
        }
        return JSON.stringify(dataJson) 
    }
    public handleData(html:string) : string{
       return this.getHtmlContent(html)
    }
}