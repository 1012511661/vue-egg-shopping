const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'shopping'
});
module.exports = createRouter = () => {
    let router = express.Router();
    // 检查登录的状态
    router.use((req, res, next) => {
        // 访问的地址不是登录页面
        if (!req.session.flag && req.url != '/login') {
            // 没有登录
            res.redirect('/admin/login') // admin 是 server定义的后端
        } else {
            next();
        }
    })
    // 展示后台首页
    router.get('/', (req, res) => {
        // 管理列表栏目
        // db.query("SELECT * FROM admin_wrap", (err, wrap) => {
        //     if (err) {
        //         return res.status(500).send('查询出现错误').end();
        //     } else {
        //         res.render('./admin/index.ejs', {
        //             wrap
        //         }); // 登录后显示后台管理页面
        //     }
        // });
        console.log('1234654')
        res.render('./index.ejs', {}); // 登录后显示后台管理页面
    })
    // login.js
    router.use('/login', require('./login')())
    return router;
}