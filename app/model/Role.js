const model = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema//定义模型

    //定义字段，约定
    const RoleSchema = new Schema({
        role_name: { type: String, default: '' },
        role_desc: { type: String, default: '' },
        time_create: { type: Number, default: Date.now()},
        data_status: {  type: Number, default: 1}//1有效 2无效
    })
    return mongoose.model('Role', RoleSchema ,'roles')

} 
module.exports = model;