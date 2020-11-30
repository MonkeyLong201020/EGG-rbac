const accessMiddleware = (options,app) => {
 return async (ctx,next)=>{
    const pathname = ctx.request.path
    const userinfo = ctx.session.userinfo
    if(userinfo){
        ctx.locals.userinfo = userinfo
        let result = await ctx.service.access.findAllWithCheck(userinfo.role_id)//根据登陆的id，查询该用户的id，对应的角色id，找到他的权限
        if(result.flag){
            let staffAccess = result.data//获取到该用户的所有权限后，存储到全局，用于响应页面
            ctx.locals.staffAccess = staffAccess
        }else{
            ctx.body=result.msg
        }
        await next()
    }else{
        if(pathname =='/admin/login'||pathname =='/admin/verify'||pathname =='/admin/dologin'){
            await next()
        }else{
            ctx.response.redirect('/admin/login')
        }
    }
 }
};
module.exports = accessMiddleware