const Controller = require('egg').Controller;

class HomeController extends Controller {
  async welcome() {
    this.ctx.body = '前台页面';
    console.log('client client client client client');
  }
}

module.exports = HomeController;