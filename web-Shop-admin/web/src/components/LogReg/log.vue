<template>
  <div id="log">
    <!-- top  -->
    <van-row type="flex" justify="center">
      <van-col span="18">
        <p class="title">登录</p>
      </van-col>
    </van-row>
    <!-- 账号 -->
    <van-row type="flex" justify="center" class="name">
      <van-col span="2">
        <i class="icon iconfont icon-mine"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input type="text" placeholder="请输入账号" class="name_input" v-model="name">
      </van-col>
    </van-row>
    <!-- 密码 -->
    <van-row type="flex" justify="center" class="pwd">
      <van-col span="2">
        <i class="icon iconfont icon-lock"></i>
      </van-col>
      <van-col span="12" offset="1">
        <input type="text" placeholder="请输入密码" class="pwd_input" v-model="pwd">
      </van-col>
    </van-row>
    <!-- 滑块 -->
    <van-row type="flex" justify="center">
      <van-col span="15">
        <!-- 整体 -->
        <div class="slider" ref="slider">
          <!-- 背景 -->
          <div class="slider_bg" ref="slider_bg"></div>
          <!-- 滑块 -->
          <div
            class="slider_btn"
            ref="slider_btn"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
          ></div>
          <!-- @touchmove='touchMove' @touchend='touchEnd' -->
          <!-- @mouseup="mouseUp($event)" -->
          <!-- 文字 -->
          <div class="slider_text" ref="slider_text">正在验证。。。</div>
        </div>
      </van-col>
    </van-row>
    <!-- <div class="slider"> 
    </div>-->
    <!-- 登录 btn -->
    <van-row type="flex" justify="center" class="btn">
      <van-col span="15" class="log_btn">
        <a href="javascript:;" @click.once="log">登录</a>
      </van-col>
    </van-row>
    <!-- 操作按钮 -->
    <van-row type="flex" justify="center" class="set_btn">
      <van-col span="8">
        <span class="reg" @click="go(1)">注册账号</span>
      </van-col>
      <van-col span="8">
        <span class="pop" @click="go(2)">游客模式</span>
      </van-col>
    </van-row>
    <!-- 提醒语 -->
    <div class="msg" @click="msgClick">
      <p class="msg_text" v-if="msgIf">{{msg}}</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from "axios";
import { Row, Col } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  props: {},
  data() {
    return {
      name: "",
      pwd: "",
      isSlider: false, // 滑块
      downX: 0, //点击滑块的位置
      rgbA: [0, 0, 0], // 背景色
      msg: "", // 提醒语
      msgIf: false // 提醒语是否
    };
  },
  methods: {
    log() {  //登录
      if (this.isSlider && this.name != "" && this.pwd != "") {
        axios.post("/shopping/logName", {
            name: this.name,
            pwd: this.pwd,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            // window.console.log(res);
            if (res.status == 200) {
              console.log(res)
              this.$localHost.save('userName',{
                  login: true, //设置了登录状态
                  userName: this.name
              })
              console.log(this.name,'this.name')
              // this.$router.push({ path: "/home" });
              // this.$store.commit("IS_INDEX", false); //index
            } else {
              if (res.status == 201) {
                this.msg = "账号不存在";
              } else {
                this.msg = "密码错误";
              }
              this.msgIf = true;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      } else {
        alert("账号密码随便填写，滑块必须滑到最右边");
      }
    },
    //跳转
    go(num) {
      if (num == 1) { //注册
        this.$store.commit("IS_REG", false);
      } else { //游客 index
        this.$router.push({ path: "/home" });
        this.$store.commit("IS_INDEX", false);
      }
    },
    // 移动端不能用 onmouse这一类的，需要用 touch 这类
    touchStart(ev) {
      let e = event.touches || window.event.touches;
      this.downX = e[0].clientX;
    },
    touchMove(ev) {
      let sli = this.$refs.slider,
        sliBg = this.$refs.slider_bg,
        sliBtn = this.$refs.slider_btn,
        sliText = this.$refs.slider_text;
      let moveX = ev.touches[0].clientX - this.downX;
      if (moveX > 0) {
        sliBtn.style.left = moveX + "px";
        this.rgbA[0] = 255 - moveX + 100;
        this.rgbA[1] = (255 - moveX) * 0.5 + 80;
        this.rgbA[2] = moveX * 0.01 - 0.5;
        sli.style.backgroundColor = `rgba(${this.rgbA[0]},245,${
          this.rgbA[1]
        }, ${this.rgbA[2]})`;
        // sliBtn.style.width = moveX + "px";
        if (moveX >= Math.ceil(sli.offsetWidth - sliBtn.offsetWidth)) {
          // window.console.log(moveX);
          // window.console.log(Math.ceil(sli.offsetWidth - sliBtn.offsetWidth));
          this.isSlider = true;
          sliText.innerHTML = "验证通过";
          sliText.style.color = "#000000";
          sliBtn.style.display = "none";
          // ev.preventDefault();
          sliBtn.touchstart = null; //清除事件
          sliBtn.touchmove = null;
        }
      }
    },
    touchEnd(ev) {
      //根据 isSlider 的值来判断让滑块是否复原
      if (this.isSlider) return; //滑到最右边直接返回，不执行下面代码
      let sliBg = this.$refs.slider_bg,
        sli = this.$refs.slider,
        sliBtn = this.$refs.slider_btn;
      sli.style.backgroundColor = `rgb(255, 255, 255)`;
      sliBtn.style.left = 0;
      sliBg.style.width = 0;
    },
    // 取消提醒
    msgClick() {
      this.msgIf = false;
    }
  },
  mounted() {}
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
#log {
  margin-top: 50px;
  .title {
    font-size: @fontSize*2;
    font-weight: 900;
    padding: 20px;
  }
  .van-row {
    margin: 5vw 2vw 2vw;
  }
  //input  登录 注册
  .name_input,
  .pwd_input {
    width: 98%;
    height: 4vh;
    margin-top: 1vh;
  }
  // 滑块验证
  .slider {
    border: 1px solid #a7a7a7;
    position: relative;
    overflow-x: hidden;
    .slider_bg {
      height: 40px;
      background: #57ff65;
      position: absolute;
      z-index: -1;
    }
    .slider_btn {
      width: 50px;
      height: 40px;
      background: #adfbff;
      position: absolute;
      cursor: pointer;
      z-index: 3;
    }
    .slider_text {
      height: 40px;
      line-height: 40px;
      text-align: center;
      z-index: 2;
    }
  }
  //登录 OK
  .btn {
    margin-top: 3vh;
    .log_btn {
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
  // 底部按钮
  .set_btn {
    margin-top: 3vh;
    span {
      padding: 5px 20px;
    }
  }
  // 提醒框
  .msg {
    background: lightslategrey;
    width: 50%;
    position: absolute;
    top: 180px;
    left: 125px;
    p {
      padding: 5vw;
      color: #fff;
      font-size: 16px;
    }
  }
  .dis_none {
    display: none;
  }
}
</style>