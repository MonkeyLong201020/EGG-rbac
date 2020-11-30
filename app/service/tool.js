const {Service} = require('egg')
const md5 = require('md5')
const svgCaptcha = require('svg-captcha')
//Service作用于控制器和数据库

class   ToolService extends Service{

    md5(content){
        return md5
    }
    getCaptcha(){
        var captcha = svgCaptcha.create()
        // console.log(captcha);
        //?存储let codeB = captcha.text
        let codeB = captcha.text
        this.ctx.session.codeB = codeB
        return captcha.data
    }
}
module.exports = ToolService