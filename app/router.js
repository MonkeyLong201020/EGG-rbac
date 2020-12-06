// app/router.js
module.exports = app => {
    const { router, controller } = app;
    //前台
    router.get('/', controller.client.index.welcome);//controller文件夹下的client文件夹下的index文件里的welcome方法
    //后台
    router.get('/admin', controller.admin.index.welcome);
    router.get('/admin/welcome', controller.admin.index.welcome);
    //登录
    router.get('/admin/login', controller.admin.login.login);
    router.post('/admin/dologin', controller.admin.login.dologin);
    router.get('/admin/verify',controller.admin.login.verify)//验证码
    
    //员工staff
    router.get('/admin/staff/list', controller.admin.staff.list)
    router.get('/admin/staff/add', controller.admin.staff.add)
    router.post('/admin/staff/doadd', controller.admin.staff.doadd)
    router.get('/admin/staff/edit', controller.admin.staff.edit)
    router.post('/admin/staff/doedit', controller.admin.staff.doedit)
    router.get('/admin/staff/delete', controller.admin.staff.delete)

    //role
    router.get('/admin/iframeController', controller.admin.role.default)
    router.get('/admin/role/add', controller.admin.role.add)
    router.post('/admin/role/doadd', controller.admin.role.doadd)
    router.get('/admin/role/list', controller.admin.role.list)
    router.get('/admin/role/edit', controller.admin.role.edit)
    router.post('/admin/role/doedit', controller.admin.role.doedit)
    router.get('/admin/role/delete', controller.admin.role.delete)
    router.get('/admin/role/auth', controller.admin.role.auth)
    router.post('/admin/role/doauth', controller.admin.role.doauth)

    //access
    router.get('/admin/access/add', controller.admin.access.add)
    router.post('/admin/access/doadd', controller.admin.access.doadd)
    router.get('/admin/access/list', controller.admin.access.list)
    router.get('/admin/access/edit', controller.admin.access.edit)
    router.post('/admin/access/doedit', controller.admin.access.doedit)
    router.get('/admin/access/delete', controller.admin.access.delete)
 
};