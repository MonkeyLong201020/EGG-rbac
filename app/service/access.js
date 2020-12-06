const { Service } = require('egg')
//Service作用于控制器和数据库

class AccessService extends Service {
    //查询所有顶级模块的方法
    async modules() {
        let modulesResult = await this.ctx.model.Access.find({ access_module_id: '0' });
        // console.log(modulesResult);//access_module_id :'0'的数组
        if (modulesResult) {
            return {
                flag: true,
                msg: "查询所有顶级模块成功",
                data: modulesResult
            }
        } else {
            return {
                flag: true,
                msg: "查询所有顶级模块失败"
            }
        }
    }
    //添加权限
    async add(access) {
        let accessModel = new this.ctx.model.Access(access)
        let saveResult = await accessModel.save()
        if (saveResult) {
            return {
                flag: true,
                msg: '权限添加成功',
                data: saveResult
            }
        } else {
            return {
                flag: false,
                msg: '权限添加失败'
            }
        }
    }
    //查询所有权限
    async findAll() {
        //自关联
        let accessAll = await this.ctx.model.Access.aggregate([
            {
                $match: { access_module_id: '0' }
            },
            {
                $lookup: {
                    from: 'accesss',//要连接的表明
                    localField: '_id',//当前集合Staff要链接的字段
                    foreignField: 'access_module_id',//外连接Role集合字段
                    as: 'subAccess'//结果赋值给Staff里的一个新的别名字段
                }
            }
        ])
        // console.log(accessAll);
        if (accessAll) {
            return {
                flag: true,
                msg: '所有权限列表查询成功',
                data: accessAll
            }
        } else {
            return {
                flag: false,
                msg: '所有权限列表查询失败'
            }
        }
    }
    //根据id查找，权限
    async findById(access_id) {
        let access = await this.ctx.model.Access.findById(access_id)
        if (access) {
            return {
                flag: true,
                msg: "id请求数据成功",
                data: access
            }
        } else {
            return {
                flag: false,
                msg: "请求数据失败"
            }
        }
    }
    //根据id修改权限操作
    async update(update_id, body) {
        let updateResult = await this.ctx.model.Access.updateOne({ _id: update_id }, body)
        console.log(updateResult);
        // console.log('updateResult',updateResult);//updateResult { n: 1, nModified: 1, ok: 1 }
        if (updateResult.nModified > 0) {
            return { flag: true, msg: '用户修改成功' }
        } else if (updateResult.nModified == 0 && updateResult.n > 0) {
            return { flag: true, msg: '请确定修改信息' }
        } else {
            return { flag: false, msg: '用户修改失败' }
        }
    }
    //根据id/type删除权限操作
    async delete(access_id, result_type) {
        access_id = this.app.mongoose.Types.ObjectId(access_id)
        //删除模块  模块类型=1
        if (result_type == 1) {
            //如果有子元素，删除自己的子元素
            let deleteResult = await this.ctx.model.Access.deleteMany({ access_module_id: access_id })
            if (deleteResult.deletedCount > 0 && deleteResult.n > 0) {
                //删除自己
                let deleteResult = await this.ctx.model.Access.deleteOne({ _id: access_id })
                if (deleteResult.deletedCount > 0) {
                    return { flag: true, msg: '本模块删除成功' }
                } else {
                    return { flag: false, msg: '本模块删除失败' }
                }
            }
        }
        //删除菜单和操作
        let deleteResult = await this.ctx.model.Access.deleteOne({ _id: access_id })
        if (deleteResult.deletedCount > 0) {
            return { flag: true, msg: '菜单或者操作删除成功' }
        } else {
            return { flag: false, msg: '本菜单或者操作删除失败' }
        }
    }
    //获取选中的权限
    async findAllWithCheck(role_id) {
        //获取所有权限
        let result1 = await this.findAll()
        //获取角色选中的所有权限
        let result2 = await this.findAccessByRole(role_id)
        // console.log(result2);
        if (result1.flag && result2.flag) {
            //所有权限的id
            let accessAll = result1.data//[{_id,.....}]
            //所有角色的权限id
            let roleAccessArray = result2.data//[{role_id,access_id}]

            let accessChecked = []
            roleAccessArray.forEach(item => {
                accessChecked.push(item.access_id.toString())
            })
            for (const access of accessAll) {
                //模块选中
                if (accessChecked.indexOf(access._id.toString()) !== -1) {
                    access.checked = true
                }
                for (const sub of access.subAccess) {
                    //操作选中
                    if (accessChecked.indexOf(sub._id.toString()) !== -1) {
                        sub.checked = true
                    }
                }
            }
            return {
                flag: true,
                data: accessAll
            }
        }
    }
    //根据id查找  角色权限
    async findAccessByRole(role_id) {
        let role_access_array = await this.ctx.model.AccessRole.find({ role_id })
        return {
            flag: true,
            data: role_access_array
        }
    }
    //根据url查询当前当前url的权限
    async findAccessByUrl(access_url) {
        // console.log('--------'+access_url);
        let result = await this.ctx.model.Access.find({ access_url })
        console.log(result);
        if (result && result.length>0) {
            return {
                flag: true,
                data: result[0]
            }
        }else{ 
            return {
                flag: false,
                msg:'url 查询失败'
            }
        }
    }
}
module.exports = AccessService