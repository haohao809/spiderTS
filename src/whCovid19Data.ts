import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
interface SummaryData {
    confirmed: string,
    die: string,
    cured: string,
    curConfirm: string,
    unconfirmed: string,
    relativeTime: string
}
interface Obj {
    [propName:string]:any
}
export default class WhCovid19Data {
    private data: string|undefined;
    private filePath = path.resolve(__dirname,'../data/data.json')
    construct(html:string) {
        // this.getHtmlContent(html);
    }
    getHtmlContent(html :string) : string{
        const $ = cheerio.load(html);
        if($('script')[11].children[0] && $('script')[11].children[0].data) {
            this.data = ($('script')[11].children[0].data);
            if(this.data) {
                const sumData = JSON.parse(this.data);
                 if(sumData) {
                     console.log(sumData.component[0].summaryDataIn);
                     return this.parseData(sumData.component[0].summaryDataIn);
                 }
             }
        }  
        return ''
    }
    parseData(summaryData :SummaryData) : string{
        let dataJson = [];
        const formatTime = this.formatDate(summaryData.relativeTime);
        if(fs.existsSync(this.filePath)) {
            dataJson = JSON.parse(fs.readFileSync(this.filePath,'utf-8'))
        }       
        dataJson[formatTime]= {
            '累计确诊' : summaryData.confirmed,
            '死亡人数' : summaryData.die,
            '治愈人数' : summaryData.cured,
            '当前确诊人数': summaryData.curConfirm,
            '疑似病例': summaryData.unconfirmed,

        }
    
        return JSON.stringify(dataJson) 
    }
    public handleData(html:string) : string{
       return this.getHtmlContent(html)
    }
    public formatDate(time:string,format='YYYY-MM-DD'): string {
        let date= new Date(parseInt(time) * 1000);
        let obj: Obj = {
            YYYY: date.getFullYear(),
            MM: ('0' + (date.getMonth() + 1)).slice(-2),
            DD: ('0' + date.getDate()).slice(-2),
        };
        Object.keys(obj).forEach((value : string )=> {
            format = format.replace(value, obj[value])
        })
        console.log('format',format);
        return format
    }
}