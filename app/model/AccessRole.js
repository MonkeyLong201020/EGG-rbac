const model = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema//定义模型

    //定义字段，约定
    const AccessRoleSchema = new Schema({
        role_id: { type: mongoose.ObjectId, required:true },
        access_id :{ type: mongoose.ObjectId, required:true }
    })
    return mongoose.model('AccessRole', AccessRoleSchema ,'accessRole')

} 
module.exports = model;