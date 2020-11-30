const {Service} = require('egg')
//Service作用于控制器和数据库

class LoginService extends Service{
    //专门处理登录的
    async dologin(username,password,codeA){
        const {ctx} = this
        let codeB = ctx.session.codeB
        if(codeA.toLowerCase() == codeB.toLowerCase() ){
            let result = await ctx.service.staff.find(username,password)
            let {name,role_id,is_super} = result.data
            if(result.flag){
                //登录进去就将name，role_id,is_super存入userinfo中
                ctx.session.userinfo = {name,role_id,is_super}
                return{
                    flag:true,
                    msg:'login success',
                    data:result.data
                } 
            }else{
                return{
                    flag:false,
                    msg:'登陆失败 用户名或密码错误'
                }
            }
        }else{
            return{
                flag:false,
                msg:'验证码错误'
            }
        }
    }
}
module.exports = LoginService