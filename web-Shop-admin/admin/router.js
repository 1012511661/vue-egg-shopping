const express = require('express');
const mysql = require('mysql');
const qs = require('fs') // 导入文件模块
const common = require('./common'); // 自定义JS
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'shopping'
});

module.exports = createRouter = () => {
    let router = express.Router();
    // 注册
    router.use('/regName', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        console.log(req.body)
        db.query(`SELECT * FROM user_login WHERE username='${req.body.name}'`, (err, data) => {
            if (err) {
                console.error(err)
                return res.status(500).send('查询出现错误').end();
            } else {
                if (data.length > 0) {
                    // console.log("账号已被注册", data.length)
                    return res.status(401).send('账号已被注册').end();
                } else {
                    let addressAll = `${req.body.address.province}-${req.body.address.city}-${req.body.address.area}`;
                    let pwd = common.md5(`${req.body.pwd}${common.MD5_SUFFIX}`);
                    // console.log(addressAll,'addressAll')
                    db.query(`INSERT INTO user_login(username,pwd,phone,email,address) VALUES( '${req.body.name}', '${pwd}', '${req.body.phone}' ,'${req.body.email}' ,'${addressAll}')`, (err, myData) => {
                        if (err) {
                            console.error(err)
                            return res.status(500).send('添加出现错误').end();
                        } else {
                            return res.status(200).send('注册成功').end();
                        }
                    })
                }
            }
        })
        // let selectArr = [req.body.name, req.body.phone, req.body.eamil];
        // // let selectArr = [1,12,2];
        // // 一次判断账号，手机，邮箱是否重复并返回重复的个数
        // let selectArrVal;
        // selectArr.map((k, i) => {
        //     switch(i){
        //         case 0:
        //         selectArrVal = 'username'
        //         break;
        //         case 1:
        //         selectArrVal = 'phone'
        //         break;
        //         case 2:
        //         selectArrVal = 'email'
        //         break;
        //     }
        //     console.log(selectArrVal,'selectArrVal')
        //     db.query(`SELECT COUNT(${i}) FROM user_login WHERE ${selectArrVal}='${k}'`, (err, data) => {
        //         if(err){
        //             return res.status(500).send('查询出现错误').end();
        //         }else{
        //             if(data.indexOf('COUNT(0)')>-1){
        //                 return res.status(501).send('账号已被注册').end();
        //             }else if(data.indexOf('COUNT(1)')>-1){
        //                 return res.status(501).send('手机号码已被注册').end();
        //             }else if(data.indexOf('COUNT(2)')>-1){
        //                 return res.status(501).send('邮箱已被注册').end();
        //             }else{
        //                 db.query(`INSERT INTO user_login (username,pwd,phone,email,address) VALUES
        //                 ( '${req.body.name}', '${req.body.pwd}', '${req.body.phone}' ,'${req.body.email}' ,'${req.body.address}' )`,(err,myData)=>{
        //                     if(err){
        //                         return res.status(500).send('添加出现错误').end();
        //                     }else{
        //                         return res.status(200).send(myData).end();
        //                     }
        //                 })
        //             }
        //         }
        //     })
        // })
    })
    // 登录
    router.use('/logName', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        let username = req.body.name;
        let pwd = common.md5(`${req.body.pwd}${common.MD5_SUFFIX}`);
        db.query(`SELECT * FROM user_login WHERE username='${username}'`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                // console.log('data')
                if (data.length == 0) {
                    // console.log(data.length)
                    res.status(201).send('账号不存在').end();
                } else {
                    if (data[0].pwd == pwd) { // 成功
                        req.session.flag = true; // 用来判断用户是否登录(可用在添加商品，前往购物车或者个人中心页面)
                        req.session.user = data; // 把用户信息存在 session 里
                        // req.session['admin_id'] = data[0].ID;
                        res.status(200).send('登录OK').end();
                    } else {
                        res.status(202).send('密码错误').end();
                    }
                }
            }
        })
    })
    // 主页 
    // banners
    router.get('/homeListBanners', (req, res) => {
        db.query(`SELECT * FROM index_banners`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                let dataListBanners = JSON.parse(JSON.stringify(data));
                // console.log(dataList)
                res.status(200).send(dataListBanners).end();
            }
        })
    })
    // hot 热卖
    router.get('/homeHotList', (req, res) => {
        db.query(`SELECT * FROM category_dataList Where category='热卖' ORDER BY ID DESC  LIMIT 4`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                let dataListHot = JSON.parse(JSON.stringify(data));
                // console.log(dataListHot)
                res.status(200).send(dataListHot).end();
            }
        })
    })
    // price 特价 
    router.get('/homePriceList', (req, res) => {
        db.query(`SELECT * FROM category_dataList Where category='特价' ORDER BY ID DESC  LIMIT 8`,
            (err, data) => {
                if (err) {
                    res.status(500).send('查询出现错误').end();
                } else {
                    let dataListPrice = JSON.parse(JSON.stringify(data));
                    // console.log(dataListHot)
                    res.status(200).send(dataListPrice).end();
                }
            })
    })
    // time 限时抢购 
    router.get('/homeTimeList', (req, res) => {
        db.query(`SELECT * FROM category_dataList Where category='限时' ORDER BY ID DESC  LIMIT 5`,
            (err, data) => {
                if (err) {
                    res.status(500).send('查询出现错误').end();
                } else {
                    let dataListTime = JSON.parse(JSON.stringify(data));
                    // console.log(dataListHot)
                    res.status(200).send(dataListTime).end();
                }
            })
    })
    // nav(分类) 
    router.get('/categoryNavList', (req, res) => {
        db.query(`SELECT * FROM category_navList`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                let dataList = JSON.parse(JSON.stringify(data));
                res.status(200).send(dataList).end();
            }
        })
    })
    // navDataList(分类列表) 
    router.get('/categoryDataList', (req, res) => {
        var id = req.query.id;
        db.query(`SELECT * FROM category_navList WHERE ID=${id}`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                let dataJson = JSON.parse(JSON.stringify(data));
                let parentTitie = dataJson[0].title;
                db.query(`SELECT * FROM category_dataList WHERE parent_title='${parentTitie}'`, (err, data) => {
                    if (err) {
                        res.status(500).send('查询出现错误').end();
                    } else {
                        let dataTent = JSON.parse(JSON.stringify(data));
                        // console.log(dataList)
                        res.status(200).send(dataTent).end();
                    }
                })
            }
        })
    })
    // 商品详情
    router.get('/goodsDetails', (req, res) => {
        let id = req.query.id;
        db.query(`SELECT * FROM category_dataList WHERE ID='${id}'`, (err, data) => {
            if (err) {
                res.status(500).send('查询出现错误').end();
            } else {
                let dataD = JSON.parse(JSON.stringify(data));
                let icon_srcList = dataD[0].icon_src.split(",");
                let icon_picList = dataD[0].icon_pic.split(",");
                let colorList = dataD[0].colorList.split(",");
                let sizeList = dataD[0].sizeList.split(",");
                dataD[0].icon_src = icon_srcList;
                dataD[0].icon_pic = icon_picList;
                dataD[0].colorList = colorList;
                dataD[0].sizeList = sizeList;
                // window.console.log(dataD, "123");
                // console.log(dataD)
                res.status(200).send(dataD).end();
            }
        })
    })
    // addCar(添加商品)
    router.use('/addCar', (req, res) => {
        if (req.session.user) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", ' 3.2.1');
            res.header("Content-Type", "application/json;charset=utf-8");
            let name = req.session.user[0].username;
            let ID = req.body.params[0].ID;
            let category = req.body.params[0].category;
            let parent_title = req.body.params[0].parent_title;
            let title = req.body.params[0].title;
            let des = req.body.params[0].des;
            let content = req.body.params[0].content;
            let icon_index = req.body.params[0].icon_index;
            let icon_src = req.body.params[0].icon_src;
            let icon_pic = req.body.params[0].icon_pic;
            let color = req.body.params[0].color;
            let colorList = req.body.params[0].colorList;
            let size = req.body.params[0].size;
            let sizeList = req.body.params[0].sizeList;
            let num = req.body.params[0].num;
            let price = req.body.params[0].price;
            let timeEnd = req.body.params[0].timeEnd;
            let timeStart = req.body.params[0].timeStart;
            db.query(`INSERT INTO car_shopList(ID,title,des,color,size,price,num,parent_title,icon_index,checked,category,username) VALUES('${ID}','${title}','${des}','${color}','${size}','${price}','${num}','${parent_title}','${icon_index}','0','${category}','${name}')`, (err, data) => {
                if (err) {
                    // console.log(1)
                    // console.error(err)
                    return res.status(500).send('查询出现错误').end();
                } else {
                    return res.status(200).send('添加成功').end();
                }
            })
        } else {
            res.status(405).send('session 缓存验证失败').end();
        }
    })
    // Car(购物车)
    router.get('/carList', (req, res) => {
        let name = req.session.user[0].username;
        // console.log(name,'name')
        db.query(`SELECT * FROM car_shoplist WHERE username='${name}' `, (err, data) => {
            if (err) {
                // console.log(2)
                console.error(err)
                return res.status(500).send('查询出现错误').end();
            } else {
                let dataList = JSON.parse(JSON.stringify(data));
                // console.log(dataD)
                return res.status(200).send(dataList).end();
            }
        })
    })
    // payCar(提交支付)
    router.use('/payCar', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        // let dataListCar = req.body.params;
        let dataListCar = req.body.params.map((v, k) => {
            var newObj = {};
            newObj.ID = v.ID;
            newObj.num = v.num;
            newObj.checked = v.checked ? 1 : 0;
            return newObj;
        });
        dataListCar.map((v, k) => {
            let ID = v.ID;
            let checked = v.checked;
            let num = v.num;
            let len = dataListCar.length;
            db.query(
                `UPDATE car_shoplist SET
                    checked = CASE id
                        WHEN '${ID}' THEN '${checked}'
                    END
                    ,num =  CASE id
                        WHEN '${ID}' THEN '${num}'
                    END
                    WHERE id IN ('${ID}')`, (err, data) => {
                    if (err) {
                        // if (k == len) {
                        //     console.error(err, '123')
                        //     // return res.status(500).send('跟新出现错误').end();
                        // }
                        console.error(err, '123')
                    } else {
                        if (k == len) {
                            var msg = res.status(200).send('OK').end();
                        }
                    }
                    return msg;
                })
            // return res.status(200).send('OK123456').end();
        })
        // return res.status(200).send('OK123456').end();
        /**
     * UPDATE car_shoplist SET
        checked = CASE id
            WHEN 1 THEN 1
            WHEN 2 THEN 1
            WHEN 13 THEN 1
        END
    WHERE id IN (1,2,13)
     */
    })
    // paying(支付页面)
    router.use('/paying', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        let name = req.session.user[0].username;
        db.query(`SELECT * FROM car_shoplist WHERE username='${name}' AND checked=1 `, (err, data) => {
            if (err) {
                // console.log(2)
                console.error(err)
                return res.status(500).send('查询出现错误').end();
            } else {
                let dataList = JSON.parse(JSON.stringify(data));
                // console.log(dataD)
                return res.status(200).send(dataList).end();
            }
        })
    })
    // AddressList(地址列表)
    router.get('/AddressList', (req, res) => {
        let username = req.session.user[0].username;
        db.query(`SELECT * FROM user_addres WHERE username='${username}'`, (err, data) => {
            if (err) {
                return res.status(500).send('查询出现错误').end();
            } else {
                let dataList = JSON.parse(JSON.stringify(data));
                dataList.map(v => {
                    if (v.isDefault == 1) {
                        v.isDefault = true;
                    } else {
                        v.isDefault = false;
                    }
                    // v.isDefault == 1 ? "true" : "false";
                    v.id = v.ID
                    v.address = `${v.province}-${v.city}-${v.county}-${v.addressDetail}`;
                })
                return res.status(200).send(dataList).end();
            }
        })
    })
    // AddressEdit(修改地址)
    router.use('/AddressEdit', (req, res) => {
        let username = req.session.user[0].username; // 用户姓名
        let dataAddressEdit = req.query;
        // console.log(req.query,'123456')
        dataAddressEdit.isDefault = dataAddressEdit.isDefault == 'true' ? 1 : 0;
        let ID = dataAddressEdit.ID;
        let name = dataAddressEdit.name;
        let tel = dataAddressEdit.tel;
        let province = dataAddressEdit.province;
        let city = dataAddressEdit.city;
        let county = dataAddressEdit.county;
        let addressDetail = dataAddressEdit.addressDetail;
        let areaCode = dataAddressEdit.areaCode;
        let postalCode = dataAddressEdit.postalCode;
        let isDefault = dataAddressEdit.isDefault;
        switch (req.query.act) {
            case '0': // 修改
                db.query(`UPDATE user_addres SET name='${name}',tel= '${tel}',
        province='${province}',city='${city}',county='${county}',addressDetail='${addressDetail}',areaCode='${areaCode}',postalCode='${postalCode}',isDefault='${isDefault}' WHERE ID = '${ID}'`, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (dataAddressEdit.isDefault == '1') { // 修改后的时候设置为默认
                            let name = req.session.user[0].username; // 用户名
                            db.query(`UPDATE user_addres SET isDefault='0' WHERE ID!='${ID}' AND username='${username}'`, (err, data) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    return res.status(200).send('修改成功并更新').end();
                                }
                            });
                        } else {
                            return res.status(200).send('修改成功').end();
                        }
                    }
                })
                break;
            case '1': // 添加
                db.query(`INSERT INTO user_addres(username,name,tel,province,city,county,addressDetail,areaCode,postalCode,isDefault) VALUES('${username}','${name}','${tel}','${province}','${city}','${county}','${addressDetail}','${areaCode}','${postalCode}','${isDefault}')`, (err, data) => {
                    if (err) {
                        return res.status(500).send('添加出现错误').end();
                    } else {
                        let ID = data.insertId
                        if (isDefault == '1') { // 修改后的时候设置为默认
                            db.query(`UPDATE user_addres SET isDefault='0' WHERE ID!='${ID}' AND username='${username}'`, (err, data) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    return res.status(200).send('修改成功并更新').end();
                                }
                            });
                        } else {
                            // let dataAddNew = JSON.parse(JSON.stringify(data));
                            // return res.status(200).send(dataAddNew).end();
                            return res.status(200).send('修改成功').end();
                        }
                    }
                })
                break;
        }
        // console.log(dataAddressEdit, 'dataAddressEdit')
    })
    // okAddPeople(默认收件人)
    router.get('/okAddPeople', (req, res) => {
        let username = req.session.user[0].username;
        db.query(`SELECT * FROM user_addres WHERE username='${username}' AND isDefault='1'`, (err, data) => {
            if (err) {
                return res.status(500).send('查询出现错误').end();
            } else {
                let dataPeople = JSON.parse(JSON.stringify(data));
                return res.status(200).send(dataPeople).end();
            }
        })
    })
    // user(个人中心)
    router.get('/user', (req, res) => {
        // console.log(req.session.user, '123456');
    })
    return router;
}