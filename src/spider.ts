
import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import WhCovid19Data from './WhCovid19Data';
const whCovid19Data = new WhCovid19Data();
class Spider {
    private data: string|undefined;
    private filePath = path.resolve(__dirname,'../data/data.json')
    constructor () {
        this.getHtmlContent();
        console.log('constructor');
    }
    async getHtml() {
       const url = await whCovid19Data.getUrl();
       const res = await superagent.get(url)
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
