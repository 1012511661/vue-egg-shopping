const express = require('express');
const common = require('../common'); // 自定义JS
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'shopping'
});
module.exports = function () {
    let router = express.Router();
    // 管理员登录模板
    router.get('/', (req, res) => {
        res.render('./login.ejs', {});
    })
    // 登录
    router.post('/', (req, res) => {
        let username = req.body.username;
        let pwd = common.md5(`${req.body.pwd}${common.MD5_SUFFIX}`);
        db.query(`SELECT * FROM admin_users WHERE username='${username}'`,(err,data)=>{
            if(err){
                res.status(500).send('查询出现错误').end();
            }else{
                if(data.length == 0){
                    res.status(201).send('后台账号不存在出现错误').end();
                }else{
                    if(data[0].pwd == pwd){
                        req.session.adminFlag = true; // 用来判断用户是否登录(可用在添加商品，前往购物车或者个人中心页面)
                        req.session.adminUser = data; // 把用户信息存在 session 里
                        res.render('./index.ejs', {}); // 登录后显示后台管理页面
                    }else{
                        res.status(202).send('密码错误').end();
                    }
                }
            }
        })
    })
    return router;
}