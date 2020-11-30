const Controller = require('egg').Controller;

class HomeController extends Controller {
  async welcome() {
    // const userinfo = this.ctx.session.userinfo
    // if(userinfo){
      // let name = userinfo.name
      let name = this.ctx.locals.userinfo.name //全局变量
      await this.ctx.render('admin/home',{name})
    // }else{
    //   this.ctx.response.redirect('/admin/login')
    // }
    
    // const userinfo = this.ctx.session.userinfo
    // if(userinfo){
    //   const name = userinfo.name
    //   // this.ctx.body = '<h1>welcome admin page</h1>'
    //   await this.ctx.render('admin/home',{name})
    // }else{
    //   this.ctx.response.redirect('/admin/login')
    // }
  }
}

module.exports = HomeController;