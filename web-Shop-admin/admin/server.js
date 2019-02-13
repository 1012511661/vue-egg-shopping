
/**
 *  状态码:
 * 200：请求被服务器正常处理
 * 201：账号不存在
 * 202：密码错误
 * 400：请求报文语法错误或者参数错误
 * 401：账号，手机，邮箱重复
 * 403：服务器拒绝
 * 404：资源找不到
 * 405：没有session
 * 500：服务器故障
 * * */
const express = require('express');
const static = require('express-static');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const expressRoute = require('express-route');
const bodyParser = require('body-parser');// post 请求
// const multer = require('multer'); // 上传
// const multerObj = multer({// 上传的位置
//     dest: './static/upload'
// })
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'shopping'
});
// 基础设置
let server = express();
server.listen(9696);

// 1.获取请求数据
// get 自带
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())
// server.use(multerObj.any())
// 2.cookie,session
server.use(cookieParser())
// 定义秘钥
let keys = [];
for (let i = 0; i < 1000; i++) {
    keys[i] = 'keys_' + Math.random();
}
server.use(cookieSession({
    name: 'sess_id', // 手动设置session名
    keys, // 手动设置session密钥
    maxAge: 24 * 3600 * 1000 // 手动设置session过期时间，单位为毫秒
}))
// 3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html')
// 4.route
server.use('/',require('./router.js')()) // 前端接口
server.use('/admin/',require('./router/index')()) // 后台接口
// 5.default:static
server.use(static('./static/'))