const Controller = require('egg').Controller;
const md5 = require('md5')

//控制器最好不要用来处理连接数据库的操作，要保持 Controller 中的逻辑更加简洁。
//那么，我们就需要用服务（Service），
//保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
class StaffController extends Controller {
  async add() {
    let result = await this.ctx.service.role.findAll()//查找所有角色
    if (result.flag) {
      let roles = result.data
      await this.ctx.render('/admin/staff/add', { roles })
    } else {
      await this.ctx.render('/admin/staff/add', result.msg)
    }

  }
  //list
  async list() {
    const { ctx } = this
    let result = await ctx.service.staff.findAll()

    if (result.flag) {
      let staffs = result.data
      await ctx.render('admin/staff/list', { staffs })
    } else {
      this.ctx.response.redirect('/admin/login')//同一个路由，先走登录，然后再走后端
    }
  }
  //用户增加操作
  async doadd() {
    const { ctx } = this
    let { username, password, name, no, phone, role_id } = ctx.request.body
    let staff = {
      username,
      password: ctx.service.tool.md5(password),
      name,
      no,
      phone,
      role_id
    }

    let result = await ctx.service.staff.add(staff)
    if (result.flag) {
      await this.ctx.render('/admin/success', { url: '/admin/staff/list', msg: result.msg })
    } else {
      await this.ctx.render('/admin/fail', { url: '/admin/staff/add', msg: result.msg })
    }
  }
  //用户修改页面
  async edit() {
    const { ctx } = this
    const staff_id = ctx.request.query.id
    let staffResult = await ctx.service.staff.findById(staff_id)
    let roleResult = await ctx.service.role.findAll()
    if (staffResult.flag && roleResult.flag) {
      let roles = roleResult.data
      let staff = staffResult.data
      await ctx.render('/admin/staff/edit', { staff, roles })
    } else {
      await ctx.render('/admin/fail', { url: '/admin/staff/add', msg: '用户显示编辑错误' })
    }
  }
  //用户修改操作
  async doedit() {
    const { ctx } = this
    const body = ctx.request.body
    let {staff_id, username, password, name, no, phone, status, role_id } = body;
    let staff;
    if (password) {
      staff = {
        username,
        password: ctx.service.tool.md5(password),
        name,
        no,
        phone,
        status,
        role_id
      }
    } else {
      staff = {
        username,
        name,
        no,
        phone,
        status,
        role_id
      }
    }

    let result = await ctx.service.staff.update(staff_id, staff)
    if (result.flag) {
      await ctx.render('/admin/success', { url: "/admin/staff/list", msg: result.msg })
    } else {
      await ctx.render('/admin/fail', { url: '/admin/staff/list', msg: result.msg })
    }
  }
  //用户删除页面
  async delete() {
    const { ctx } = this
    const staff_id = ctx.request.query.id
    let result = await ctx.service.staff.delete(staff_id)
    if (result.flag) {
      await ctx.render('/admin/success', { url: '/admin/staff/list', msg: result.msg })
    } else {
      await ctx.render('/admin/fail', { url: '/admin/staff/list', msg: result.msg })
    }
  }
}

module.exports = StaffController;