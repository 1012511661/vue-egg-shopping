<template>
  <div id="reg">
    <!-- top  -->
    <van-row type="flex" justify="center">
      <van-col span="18">
        <p class="title">注册</p>
      </van-col>
    </van-row>
    <!-- 账号 -->
    <van-row type="flex" justify="center" class="name inoput_all">
      <van-col span="2">
        <i class="icon iconfont icon-mine"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input
          type="text"
          placeholder="请输入账号(6~16位 字母数字)"
          class="name_input input"
          v-model="name"
          trim
        >
      </van-col>
    </van-row>
    <!-- 密码 -->
    <van-row type="flex" justify="center" class="pwd inoput_all">
      <van-col span="2">
        <i class="icon iconfont icon-lock"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input
          type="text"
          placeholder="请输入密码(6~16位 字母数字)"
          class="pwd_input input"
          v-model="pwd"
          trim
        >
      </van-col>
    </van-row>
    <!-- 确认密码 -->
    <van-row type="flex" justify="center" class="pwdOk inoput_all">
      <van-col span="2">
        <i class="icon iconfont icon-lock"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input type="text" placeholder="请确认密码" class="pwdOk_input input" v-model="pwdOk" trim>
      </van-col>
    </van-row>
    <!-- 手机号码 -->
    <van-row type="flex" justify="center" class="phone inoput_all">
      <van-col span="2">
        <i class="icon iconfont icon-mobilephone"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input type="text" placeholder="请输入手机号码" class="phone_input input" v-model="phone" trim>
      </van-col>
    </van-row>
    <!-- 验证码 -->
    <van-row type="flex" justify="center" class="code inoput_all">
      <van-col span="8.5">
        <input type="text" placeholder="请输入验证码" class="code_input input" v-model="codeI">
      </van-col>
      <van-col span="5" offset="1">
        <a href="javascript:;" class="code_input-a" @click="code">获取验证码</a>
      </van-col>
    </van-row>
    <!-- 邮箱 -->
    <van-row type="flex" justify="center" class="email">
      <van-col span="2">
        <i class="icon iconfont icon-mail"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input type="email" placeholder="请输入邮箱" class="email_input input" v-model="email">
      </van-col>
    </van-row>
    <!-- 地区 -->
    <van-row type="flex" justify="center" class="map inoput_all">
      <van-col span="20">
        <v-distpicker
          :province="select.province"
          @province="changeProvince"
          :city="select.city"
          @city="changeCity"
          :area="select.area"
          @area="changeArea"
          class="form-control"
        ></v-distpicker>
      </van-col>
    </van-row>
    <!-- 头像 -->
    <van-row type="flex" justify="center" class="img">
      <van-col span="2">
        <i class="van-icon van-icon-photograph"></i>
      </van-col>
      <van-col span="12" offset="1">
        <van-uploader :after-read="onRead" accept="image/*" multiple>
          <img
            class="head-img"
            src="https://dummyimage.com/200x200/04a1f7/FFF.png&text=789"
            ref="goodsImg"
          >
        </van-uploader>
      </van-col>
    </van-row>

    <!-- 注册 btn -->
    <van-row type="flex" justify="center" class="btn">
      <van-col span="15" class="reg_btn">
        <a href="javascript:;" @click="reg">注册</a>
      </van-col>
    </van-row>
    <!-- 操作按钮 -->
    <van-row type="flex" justify="center" class="set_btn">
      <van-col span="8">
        <span class="reg" @click="go(0)">直接登录</span>
      </van-col>
      <van-col span="8">
        <span class="pop" @click="go(2)">游客模式</span>
      </van-col>
    </van-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from "axios";
import { Row, Col, Toast, Uploader, Icon } from "vant";
import VDistpicker from "v-distpicker"; //地区选择器
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    VDistpicker
  },
  data() {
    return {
      name: "",
      pwd: "",
      pwdOk: "",
      phone: "",
      codeI: "",
      email: "",
      select: { province: "陕西省", city: "西安市", area: "灞桥区" },
      regList: [],
      regObj: {},
      num: 0
    };
  },
  methods: {
    //选择图片后执行
    onRead(file) {
      console.log(file.content);
      //将原图片显示为选择的图片
      this.$refs.goodsImg.src = file.content;
    },
    changeProvince(data) {
      this.select.province = data.value;
    },
    changeCity(data) {
      this.select.city = data.value;
    },
    changeArea(data) {
      this.select.area = data.value;
    },
    //验证码
    code() {
      alert("测试验证码：123456");
    },
    // reg
    reg() {
      /***
       *  regList:[] 用来存储每一项是否填写正确
       *  regObj:{} 用来存储争取的数据
       */
      let regN = new RegExp(/^[a-zA-Z0-9_-]{6,16}$/);
      if (regN.test(this.name)) this.regList[0] = 1;
      else this.regList[0] = 0;

      let regP = new RegExp(/^[a-zA-Z0-9]{6,16}$/);
      if (regP.test(this.pwd)) this.regList[1] = 1;
      else this.regList[1] = 0;

      if (
        this.pwdOk.trim() == this.pwd.trim() &&
        this.pwd != "" &&
        this.pwdOk != ""
      )
        this.regList[2] = 1;
      else this.regList[2] = 0;

      let regPh = new RegExp(
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      );
      if (regPh.test(this.phone)) this.regList[3] = 1;
      else this.regList[3] = 0;

      if (this.codeI == "123456") this.regList[4] = 1;
      else this.regList[4] = 0;

      let regE = new RegExp(
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        // /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        // /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      );
      console.log(this.email, "email");
      if (regE.test(this.email)) this.regList[5] = 1;
      else this.regList[5] = 0;

      this.num = 0;
      let len = this.regList.length;
      this.regList.forEach((item, index) => {
        if (item == 1) {
          this.num++;
          // console.log(`值--${item},下标--${index},AA -- ${this.regList[index]}`)
        } else {
          switch (index) {
            case 0:
              window.console.log("账号错误");
              break;
            case 1:
              window.console.log("密码错误");
              break;
            case 2:
              window.console.log("两次密码不一致");
              break;
            case 3:
              window.console.log("手机号码不对");
              break;
            case 4:
              window.console.log("验证码不对");
              break;
            case 5:
              window.console.log("邮箱不对");
              break;
          }
        }
      });
      if (this.num == 6) {
        this.regList[6] = {
          province: this.select.province,
          city: this.select.city,
          area: this.select.area
        };
        //这里写请求 数据是 regObj
        // alert("正在注册");
        this.regObj = {
          name: this.name,
          pwd: this.pwd,
          phone: this.phone,
          codeI: this.codeI,
          email: this.email,
          address: this.select
        };
        console.log(this.regObj, "select");
        // console.log(this.regList)
        axios
          .post("/shopping/regName", {
            name: this.name,
            pwd: this.pwd,
            phone: this.phone,
            codeI: this.codeI,
            email: this.email,
            address: this.select,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            window.console.log(res);
            this.$store.commit("IS_REG", true); //log
            this.name = "";
            this.pwd = "";
            this.pwdOk = "";
            this.phone = "";
            this.codeI = "";
            this.email = "";
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("信息有误");
      }
    },
    // go
    go(num) {
      if (num == 0) {
        this.$store.commit("IS_REG", true); //log
      } else {
        this.$router.push({ path: "/home" });
        this.$store.commit("IS_INDEX", false); //index
      }
    }
  }
};
</script>

<style lang='less' scoped>
@wid: 10vw; //1vw = 3.75px  6Splue
@hei: 5vh; //1vh = 6.66px  6Splue
@fontSize: 10px;
i {
  font-size: 4vh; //高度不变
  height: 7vh;
  line-height: 7vh;
}
#reg {
  margin-top: 50px;
  .title {
    font-size: @fontSize*2;
    font-weight: 900;
    padding: 1vw;
  }
  .email {
    margin: 2vw 0;
    input {
      width: 100%;
      height: 30px;
      margin-top: 11px;
    }
  }
  .img {
    i {
      display: inline-block;
      margin-top: 5vw;
    }
    img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      object-fit: scale-down;
    }
  }
  .inoput_all {
    margin: 1vw 0;
    input {
      width: 98%;
      height: 30px;
      margin-top: 11px;
      // margin-top: 1vw;
    }
    .code_input-a {
      display: inline-block;
      height: 4vh;
      line-height: 4vh;
      margin-top: 1vh;
      padding: 0.3vh 3vw;
      background: #f35454;
      color: #ffffff;
    }
    .map {
      margin-top: 2vh;
    }
  }
  .btn {
    margin-top: 3vh;
    .reg_btn {
      background: red;
      height: 6vh;
      a {
        color: #fff;
        font-size: @fontSize*1.4;
        height: 6vh;
        line-height: 6vh;
      }
    }
  }
  .set_btn {
    margin-top: 3vh;
    span {
      padding: 5px 20px;
    }
  }
}
</style>