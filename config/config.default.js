var config = {}
config.keys = '123'

//配置插件  模板引擎
config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.html': 'nunjucks',
    },
};
//安全
config.security = {
    csrf: {
        queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    }
};
//mongoose，配置，连接数据库相关的配置
config.mongoose = {
    client: {
        url: 'mongodb://127.0.0.1:27017/rbac202011',
        options: {useUnifiedTopology:true}
    }
};
//Cookie 在 Web 应用中经常承担标识请求方身份的功能，所以 Web 应用在 Cookie 的基础上封装了 Session 的概念，专门用做用户身份识别。
//Session 的实现是基于Cookie的，默认配置下，用户 Session的内容加密后直接存储在 Cookie 中的一个字段中，
//用户每次请求我们网站的时候都会带上这个 Cookie，我们在服务端解密后使用。
config.session = {
    key: 'EGG_SESS',
    maxAge: 24*3600* 1000, 
    httpOnly: true,
    encrypt: true,
};
//中间件
// 配置需要的中间件，数组顺序即为中间件的加载顺序
config.middleware = [ 'adminAuth' ]
  
// 配置 gzip 中间件的配置
config.adminAuth={
    enable:true,
    match: '/admin'
}


module.exports = config