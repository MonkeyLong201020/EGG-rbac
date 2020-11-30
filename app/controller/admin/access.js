const Controller = require('egg').Controller;
const md5 = require('md5')


class AccessController extends Controller {
  //权限添加界面
  async add(){
    //查询所有顶级模块 access_module_id ='0'
    let result = await this.ctx.service.access.modules();
    if(result.flag){
      let modules = result.data
      await this.ctx.render('admin/access/add',{modules});  
    }else{
      this.ctx.body=result.msg
    }
  }
  //权限添加
  async doadd(){
    const {ctx} = this
    const body = ctx.request.body
    let {
      access_type,
      access_module,
      access_action,
      access_url,
      access_module_id,
      data_sort,
      access_desc
    } = body
    if(access_module_id != '0'){
      access_module_id = this.app.mongoose.Types.ObjectId(access_module_id)
    }
    let accessBody ={
      access_type,
      access_module,
      access_action,
      access_url,
      access_module_id,
      data_sort,
      access_desc
    } 
    let result = await ctx.service.access.add(accessBody)
    if(result.flag){
      await ctx.render('/admin/success',{url:'/admin/access/list',msg:result.msg})
    }else{
      await ctx.render('/admin/fail',{url:'/admin/access/add'})
    }
  }
  //权限列表
  async list(){ 
    const {ctx}= this
    let result = await ctx.service.access.findAll()
    if(result.flag){
      let accessAll = result.data
      await ctx.render('/admin/access/list',{accessAll})
    }else{
      await ctx.render('/admin/access/add',result.msg)
    }
  }
  //权限修改页面
  async edit(){
    const {ctx} = this
    let access_id = ctx.request.query.id
    //查询所有顶级模块 access_module_id ='0'
    let modulesResult = await ctx.service.access.modules();
    let accessResult = await ctx.service.access.findById(access_id)
    if(modulesResult.flag&&accessResult.flag){
      let modules = modulesResult.data
      let access = accessResult.data
      await ctx.render('/admin/access/edit',{modules,access})
    }else{
      ctx.body = '操作失败'
    }
  }
  //权限修改操作
  async doedit(){
    const {ctx} = this
    const body = ctx.request.body
    let {
      _id,
      access_type,
      access_module,
      access_action,
      access_url,
      access_module_id,
      data_sort,
      data_status,
      access_desc
    } = body
    if(access_module_id != '0'){
      access_module_id = this.app.mongoose.Types.ObjectId(access_module_id)
    }
    let accessBody ={
      access_type,
      access_module,
      access_action,
      access_url,
      access_module_id,
      data_sort,
      data_status,
      access_desc
    }
    console.log(accessBody);
    
    let result = await ctx.service.access.update(_id,accessBody)
    if(result.flag){
      await ctx.render('/admin/success',{url:'/admin/access/list',msg:result.msg})
    }else{
      await ctx.render('/admin/fail',{url:'/admin/access/list'})
    }
  }
  //权限删除操作
  async delete(){
    const {ctx} = this
    const access_id = ctx.request.query.id
    const access_type =ctx.request.query.type
    let result = await ctx.service.access.delete(access_id,access_type)

    if(result.flag){
      await ctx.render('/admin/success',{url:'/admin/access/list',msg:result.msg})
    }else{
      await ctx.render( '/admin/fail',{url:'/admin/access/list',msg:result.msg})
    }
  }
}

module.exports = AccessController;