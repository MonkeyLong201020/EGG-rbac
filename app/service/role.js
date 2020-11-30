const { Service } = require('egg')
//Service作用于控制器和数据库

class RoleService extends Service {
    //添加用户
    async add(role) {
        let roleModel = new this.ctx.model.Role(role)
        let saveResult = await roleModel.save()
        if (saveResult) {
            return {
                flag: true,
                msg: '角色添加成功',
                data: saveResult
            }
        } else {
            return {
                flag: false,
                msg: '角色添加失败'
            }
        }
    }
    //获取所有角色列表
    async findAll() {
        try {
            let roles = await this.ctx.model.Role.find({})//从数据库中拿到的是数组
            if (roles) {
                return {
                    flag: true,
                    msg: "查询所有角色列表成功",
                    data: roles
                }
            } else {
                return {
                    flag: false,
                    msg: "查询所有角色列表失败"
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: "数据错误"
            }
        }
    }
    //根据id 查询role
    async findById(id) {
            let role = await this.ctx.model.Role.findById(id)
            if (role) {
                return {
                    flag: true,
                    msg: "请求数据chenggong",
                    data: role
                }
            } else {
                return {
                    flag: false,
                    msg: "请求数据失败"
                }
            }
    }
    //根据id更新操作
    async update(role_id,updateBody) {
        let updateResult = await this.ctx.model.Role.updateOne({_id:role_id},updateBody)
        console.log('updateResult',updateResult);//updateResult { n: 1, nModified: 1, ok: 1 }
        if(updateResult.nModified>0){
            return {flag:true,msg:'角色修改成功'}
        }else{
            return {flag:false,msg:'角色修改失败'}
        }
    }
    //根据id删除操作
    async delete(role_id){
        // console.log('-----');
        let deleteResult = await this.ctx.model.Role.deleteOne({_id:role_id})
        console.log('deleteResult',deleteResult);//deleteResult { n: 1, ok: 1, deletedCount: 1 }
        if(deleteResult.deletedCount>0){
            return {flag:true,msg:'角色删除成功'}
        }else{
            return {flag:false,msg:'角色删除失败'}
        }
    }
    //绑定角色和权限
    async addAccessRole(role_id,AccessRoleArray){
        let result1 = await this.ctx.model.AccessRole.deleteMany({role_id})
        let result2 = await this.ctx.model.AccessRole.insertMany(AccessRoleArray)
        // console.log(result);
        if(result2){
            return {
                flag:true,
                msg:'存储角色权限成功',
                data:result2
            }
        }else{
            return {
                flag:false, 
                msg:'存储角色权限失败',
            }
        }

    }
     
}
module.exports = RoleService