
import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import WhCovid19Data from './WhCovid19Data';
class Spider {
    private url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_1"
    private data: string|undefined;
    private filePath = path.resolve(__dirname,'../data/data.json')
    constructor () {
        this.getHtmlContent();
        console.log('constructor');
    }
    async getHtml() {
       const res = await superagent.get(this.url)
       return res.text;
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath,content)
    }
    async getHtmlContent() {
        const htmlContent = await this.getHtml();
        console.log('htmlContent',htmlContent);
        const fileContent = whCovid19Data.handleData(htmlContent);
        this.writeFile(fileContent);
    }
}

const spider = new Spider();
const whCovid19Data = new WhCovid19Data();