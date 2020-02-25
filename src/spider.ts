
import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import WhCovid19Data from './WhCovid19Data';
const whCovid19Data = WhCovid19Data.getInstance();
class Spider {
    private filePath = path.resolve(__dirname,'../data/data.json')
    constructor () {
        this.getHtmlContent();
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
        const fileContent = whCovid19Data.handleData(htmlContent);
        this.writeFile(fileContent);
    }
}

const spider = new Spider();


