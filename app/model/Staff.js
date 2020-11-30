const model = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema//定义模型

    //定义字段，约定
    const StaffSchema = new Schema({
        role_id:{type:mongoose.ObjectId,required:true},//角色id
        username: { type: String, required: true },//账号
        password: { type: String, required: true },//密码
        name: { type:String, required: true },//名称
        no: { type: String, default: '' },//编号
        phone: { type: String, default: '' },//电话
        status:{ type: Number, default: 1 },// 1正常0异常time_create:itype:String,default: ' '}
        time_create: { type: Number, default: Date.now()},
        time_last:{ type: Number, default: Date.now() }, 
        ip_last: { type: String, default: '' },//登陆后访问ip
        is_super: { type: Number, default: 0 }// 1超级管理员0︰普通}
    })
    return mongoose.model('Staff', StaffSchema ,'staffs')

} 
module.exports = model;