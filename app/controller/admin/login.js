const Controller = require('egg').Controller;
const md5 = require('md5')

class LoginController extends Controller {
  async login() {
    await this.ctx.render('admin/login');//渲染view下的admin下的login.html
  }
  //登录操作
  async dologin() {
    //01 获取username password
    //02 password md5加密 密文
    //codeA ==codeB ok{
       //03 username+密文 查询数据库
    //04 if（存在）{重定向后台首页}else{用户名或密码错误}
    //}else{
      //提示验证码失败
    //}

    let staff = this.ctx.request.body
    // console.log(result);
    let username = staff.username
    let password = md5(staff.password)
    let codeA = staff.code;

    //与service文件夹  相关联
    let result = await this.ctx.service.login.dologin(username,password,codeA)
    // console.log(result)
    if(result.flag){
      this.ctx.response.redirect('/admin')//进入后台页面
    }else{
      this.ctx.body = result.msg
    }
  }
  //验证码 
  async verify(){
    let result = this.ctx.service.tool.getCaptcha()
    // console.log(result); 
    this.ctx.response.type = "image/svg+xml"
    this.ctx.body = result
  }
}
module.exports = LoginController;