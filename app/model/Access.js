const model = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema//定义模型

    //定义字段，约定
    const AccessSchema = new Schema({
        access_type:{type:String,required:true},//权限类型1模块 2菜单 3操作
        access_module:{type:String,default: ''},//权限模块
        access_action:{type:String, default: ''},//权限操作(2菜单 3操作)
        access_url:{type:String, default: ''},//权限资源
        access_desc:{type:String, default: ''},//权限描述
        access_module_id:{type:mongoose.Mixed ,default: ""},//所属模块︰顶级模块'0'，具体模块Ojectid
        access_sort:{type:Number,default : 100} ,//数据排序
        data_status:{type:Number, default: 1},//数据类型 1有效 2无效
        time_create:{type:Number,default:Date.now()}//创建时间
    })
        return mongoose.model('Access',AccessSchema,'accesss')
        
} 
module.exports = model;