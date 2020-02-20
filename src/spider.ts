
import superagent from 'superagent'
class Spider {
    private url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_1"
    constructor () {
        this.getHtml();
        console.log('constructor');
    }
    async getHtml() {
       const res = await superagent.get(this.url)
       console.log(res.text);
    }

}
const spider = new Spider();