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
    [propName: string]: any
}
interface DataJson {
    [propName: string]: {}
}
export default class WhCovid19Data {
    private data: string|undefined;
    private url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_1"
    private filePath = path.resolve(__dirname,'../data/data.json')

    private static instance: WhCovid19Data
    // 单例模式
    static getInstance() {
        if(!WhCovid19Data.instance) {
            WhCovid19Data.instance = new WhCovid19Data()
        }

        return WhCovid19Data.instance
    }
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
        let dataJson: DataJson= {};
        const curTime:string = this.formatDate(summaryData.relativeTime,'curtime');
        const formatTime = this.formatDate(summaryData.relativeTime,'datatime');
        if(fs.existsSync(this.filePath)) {
            try {
                let res = fs.readFileSync(this.filePath,'utf-8');
                if(res) {
                    dataJson = JSON.parse(res);
                }
                
                console.log('dataJson',dataJson);
            } catch (error) {
                console.log('error',error)
            }
           
        }       
        dataJson[curTime]= {
            '累计确诊' : summaryData.confirmed,
            '死亡人数' : summaryData.die,
            '治愈人数' : summaryData.cured,
            '当前确诊人数': summaryData.curConfirm,
            '疑似病例': summaryData.unconfirmed,
            '日期': formatTime

        }
    
        return JSON.stringify(dataJson) 
    }
    public handleData(html:string) : string{
       return this.getHtmlContent(html)
    }
    public formatDate(time:string, parm: string,format='YYYY-MM-DD HH:mm:ss'): string {
        let date : Date;
        if(parm == 'datatime') {
            date = new Date(parseInt(time) * 1000); 
        } else {
            date = new Date(); 
        }
        let obj:Obj = {
            YYYY: date.getFullYear(),
            MM: ('0' + (date.getMonth() + 1)).slice(-2),
            DD: ('0' + date.getDate()).slice(-2),
            HH: ('0' + date.getHours()).slice(-2),
            mm: ('0' + date.getMinutes()).slice(-2),
            ss: ('0' + date.getSeconds()).slice(-2),
            w: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
            YY: ('' + date.getFullYear()).slice(-2),
            M: date.getMonth() + 1,
            D: date.getDate(),
            H: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        };
        Object.keys(obj).forEach((value : string)=> {
            format = format.replace(value, obj[value])
            })
        return format
    }
    public getUrl() {
        return this.url;
    }
}