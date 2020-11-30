const Controller = require('egg').Controller;
const md5 = require('md5')


class RoleController extends Controller {
  async default() {
    await this.ctx.render('admin/default');
  }
  //角色添加页面
  async add() {
    await this.ctx.render('admin/role/addRole');
  }
  //角色添加操作
  async doadd() {
    const { ctx } = this

    let { role_name, role_desc } = ctx.request.body
    let role = { role_name, role_desc }

    let result = await ctx.service.role.add(role)
    if (result.flag) {
      await ctx.render('/admin/success', { url: '/admin/role/list', msg: result.msg })
    } else {
      await ctx.render('/admin/fail', { url: '/admin/role/doadd', msg: result.msg })
    }
  }
  //从数据库拿回所有列表，显示所有角色列表 渲染所有列表
  async list() {
    const { ctx } = this
    let result = await ctx.service.role.findAll()
    if (result.flag) {
      await ctx.render('/admin/role/list', { roles: result.data })
    } else {
      ctx.body = result.msg
    }
  }
  //显示修改页面
  async edit() {
    const { ctx } = this
    const role_id = ctx.request.query.id
    let result = await ctx.service.role.findById(role_id)
    if (result.flag) {
      let role = result.data
      await ctx.render('/admin/role/edit', { role })
    } else {
      ctx.body = result.msg
    }
  }
  //修改操作
  async doedit() {
    const { ctx } = this
    const body = ctx.request.body
    let { role_id, role_name, role_desc, data_status } = body
    let data_status1 = data_status == 'on' ? 1 : 0
    let updateBody = {
      role_name,
      role_desc,
      data_status: data_status1
    }
    console.log(body);
    let result = await ctx.service.role.update(updateBody, role_id)
    if (result.flag) {
      await ctx.render('/admin/success', { url: '/admin/role/list', msg: result.msg })
    } else {
      await ctx.render('/admin/fail', { url: `/admin/role/edit?id=${role_id}`, msg: result.msg })
    }
  }
  //删除操作
  async delete() {
    const { ctx } = this
    const role_id = ctx.request.query.id
    let result = await ctx.service.role.delete(role_id)
    if (result.flag) {
      await ctx.render('/admin/success', { url: '/admin/role/list', msg: result.msg })
    } else {
      await ctx.render('/admin/fail', { url: '/admin/role/list', msg: result.msg })
    }
  }
  //显示授权
  async auth() {
    const { ctx } = this
    //角色id
    let role_id = ctx.request.query.id

    let accessResult = await ctx.service.access.findAllWithCheck(role_id)
    console.log(accessResult);
    let accessAll = accessResult.data
    if (accessResult.flag) {
      await ctx.render('/admin/role/auth', { role_id, accessAll })
    }

  }
  //授权提交操作
  async doauth() {
    const { ctx } = this
    let body = ctx.request.body
    // console.log(body);
    // {
    //   role_id: '5fb9ea1b716df16f2c5b27e6',
    //   access_checked: [
    //     '5fbf64bf93f34726dce9fe72',
    //     '5fbfb19f3365806ba03e13c9',
    //     '5fbfb1a63365806ba03e13ca'
    //   ],
    //   _csrf: 'ZrfbjLCI-d6f5i2C_HWDqpbMKkiMiZz4l1kg'
    // }
    let { role_id, access_checked } = body
    var AccessRoleArray = []
    access_checked.forEach(access_id => {
      var role_access = {
        role_id,
        access_id
      }
      AccessRoleArray.push(role_access)
    });

    //存储角色 权限关联
    let result = await ctx.service.role.addAccessRole(role_id,AccessRoleArray)
    if (result.flag) {
      await ctx.render('/admin/success', { url: '/admin/role/list', msg: result.msg })
    } else {
      ctx.body = result.flag
    }

  }
}

module.exports = RoleController;