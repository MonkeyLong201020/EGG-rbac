const { Service } = require('egg')
//Service作用于控制器和数据库

class StaffService extends Service {

    //专门处理登录的
    async find(username, password) {
        //操作数据库
        let staff = await this.ctx.model.Staff.findOne({ username, password })
        // console.log('staff------'+staff);//数据库查找到后返回staff格式，给控制器
        //查找数据库 ，返回给控制器
        if (staff) {
            return {
                flag: true,
                msg: ' 查询成功',
                data: staff
            }
        } else {
            return {
                flag: false,
                msg: '查询失败'
            }
        }
    }
    //根据用户名查找staff
    async find(username) {
        //操作数据库
        let staff = await this.ctx.model.Staff.findOne({ username })
        // console.log('staff------'+staff);//数据库查找到后返回staff格式，给控制器
        //查找数据库 ，返回给控制器
        if (staff) {
            return {
                flag: true,
                msg: ' 查询成功',
                data: staff
            }
        } else {
            return {
                flag: false,
                msg: '查询失败'
            }
        }
    }
    //添加用户
    async add(staff) {
        //username password
        //username 是否存在
        //如果存在改名字的用户，提示增加失败，否则增加成功  
        let { username, password } = staff
        let result1 = await this.find(username)
        if (result1.flag) {
            return {
                flag: false,
                msg: 'username 已经存在，不能重复增加'
            }
        } else {
            let staffModel = new this.ctx.model.Staff(staff)
            let saveResult = await staffModel.save()
            if (saveResult) {
                return {
                    flag: true,
                    msg: '添加用户成功',
                    data: saveResult
                }
            } else {
                return {
                    flag: false,
                    msg: '添加用户失败'
                }
            }
        }
    }
    //查询所有staff
    async findAll() {
        //操作数据库
        let staffs = await this.ctx.model.Staff.aggregate([
            // {
            //     $match: { "status": 1 }
            // },
            {
                $lookup: {
                    from: 'roles',//要连接的表明
                    localField: 'role_id',//当前集合Staff要链接的字段
                    foreignField: '_id',//外连接Role集合字段
                    as: 'role'//结果赋值给Staff里的一个新的别名字段
                }
            }
        ])
        if (staffs) {
            return {
                flag: true,
                msg: ' 查询成功',
                data: staffs
            }
        } else {
            return {
                flag: false,
                msg: '查询失败'
            }
        }
    }
    //id查询用户修改
    async findById(staff_id) {
        let staff = await this.ctx.model.Staff.findById(staff_id)
        if (staff) {
            return {
                flag: true,
                msg: "id请求数据成功",
                data: staff
            }
        } else {
            return {
                flag: false,
                msg: "请求数据失败"
            }
        }
    }
    //更新操作
    async update(staff_id,body){
        //01 查询需要修改的用户
        let staff = await this.ctx.model.Staff.findById(staff_id)
        //02判断自己修改
        if(staff.username !== body.username){
            //03判断修改后的用户名是否和其他用户重复 
            let result = await this.find(body.username)
            if(result.flag){
                return{ flag:false,msg:"账号名不能重复"}
            }
        }
        let updateResult = await this.ctx.model.Staff.updateOne({_id:staff_id},body)
        // console.log('updateResult',updateResult);//updateResult { n: 1, nModified: 1, ok: 1 }
        if(updateResult.nModified>0){
            return {flag:true,msg:'用户修改成功'}
        }else if(updateResult.nModified==0&&updateResult.n>0){
            return {flag:true,msg:'请确定修改信息'}
        }else{
            return {flag:false,msg:'用户修改失败'}
        }
    }
    //删除操作
    async delete(staff_id){
        let deleteResult = await this.ctx.model.Staff.deleteOne({_id:staff_id})
        if(deleteResult.deletedCount>0){
            return {flag:true,msg:'角色删除成功'}
        }else{
            return {flag:false,msg:'角色删除失败'}
        }
    }
}
module.exports = StaffService