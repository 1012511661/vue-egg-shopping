const crypto = require('crypto');
function toDou(n) {
    return n < 10 ? '0' + n : n
}
module.exports ={
    MD5_SUFFIX:'qDO1d!!!42x1aALI5s***4d看你破解wasfj1221903JFPOJ9isfajfo',// 自定义的加密拼接值
    md5:str=>{
        let obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    },
    timeDat:time=>{
        let oDate = new Date();
        oDate.setTime(time * 1000);
        return oDate.getFullYear()+'-'+toDou(oDate.getMonth()+1)+'-'+toDou(oDate.getDate())+' '+toDou(oDate.getHours())+':'+toDou(oDate.getMinutes())+':'+toDou(oDate.getSeconds());
    }
}