<template>
  <div id="times">
    <!-- banner 2 -->
    <van-row class="banner banner_2">
      <van-col span="24">
        <router-link :to="{name:'car'}" class="banner_a">
          <img src="http://dummyimage.com/400x100/b97cc9/FFF.png&text=s2-banner" alt>
        </router-link>
      </van-col>
    </van-row>
    <!-- 商品 -->
    <van-row>
      <van-col span="24" class="time_col" v-for="(itme,index) in timeList" :key="index">
        <div class="time_col_l">
          <p class="time_col_l_title">{{itme.title}}</p>
          <p class="time_col_l_time">
            <span class="tiem-h">{{newDateHMS[0]}}</span>:
            <span class="tiem-m">{{newDateHMS[1]}}</span>:
            <span class="tiem-s">{{newDateHMS[2]}}</span>
          </p>
          <p class="time_col_l_start">
            抢购时间
            <span
              class="start_time"
            >{{itme.timeStart|getTimeHours}} : {{itme.timeStart|getTimeMinutes}}</span>
          </p>
        </div>
        <div class="time_col_r">
          <router-link :to="{path: '/detailst',query:{id:index}}">
            <div class="link">
              <img :src="itme.icon_index" alt>
              <span class="time_col_r_price">￥{{itme.price}}</span>
            </div>
          </router-link>
        </div>
      </van-col>
    </van-row>
    <!-- banner 3 -->
    <van-row class="banner banner_3">
      <van-col span="24">
        <router-link :to="{name:'car'}" class="banner_a banner_3_a">
          <img src="https://dummyimage.com/400x100/00FFFF/FFF.png&text=s3-banner" alt>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Row, Col, Icon } from "vant";
export default {
  name: "times",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  props: {},
  data() {
    return {
      timeList: [],
      newDateHMS: ["", "", ""] // 倒计时 时分秒
    };
  },
  methods: {
    newDateTime(time) {
      let timeStart = new Date(time);
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      this.newDateHMS = [hour, minute, second].map((v, k) => {
        v = v.toString();
        return v[1] ? v : "0" + v;
      });
    },
    getTimeCountdown() {
      const timer = setInterval(() => {
        this.newDateTime(new Date());
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  },
  filters: {
    getTimeHours: time => {
      let timeHours = new Date(parseInt(time) * 1000).getHours();
      return timeHours > 10 ? timeHours : `0${timeHours}`;
    },
    getTimeMinutes: time => {
      let timeMinutes = new Date(parseInt(time) * 1000).getMinutes();
      return timeMinutes > 10 ? timeMinutes : `0${timeMinutes}`;
    }
  },
  created() {
    this.axios
      .get("/shopping/homeTimeList")
      .then(res => {
        this.timeList = res.data;
      })
      .catch(err => console.log(err));
    this.getTimeCountdown();
  },
  beforeDestroy() {
    window.clearInterval(this.setIntTime);
    this.setIntTime = null;
  }
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#times {
  padding-top: 1vh;
  background: #fff;
  .banner {
    .banner_a {
      display: inline-block;
    }
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .time_col {
    padding: 0 5vw 0 7vw;
    div {
      display: inline-block;
    }
    .time_col_l,
    .time_col_r {
      width: 50%;
      font-size: 1.6 * @fSize;
      .time_col_l_title {
        // font-size: 1.6*@fSize;
        padding-top: 5vh;
        text-align: left;
      }
      .time_col_l_time {
        // font-size: 16px;
        padding-top: 2vh;
      }
      .tiem-h,
      .tiem-m,
      .tiem-s {
        display: inline-block;
        text-align: center;
        padding: 1.6vw;
        margin: 1vw;
        color: #fff;
        border-radius: 0.5vw;
        background-color: #444;
        // font-size: 13px;
        font-size: 1.3 * @fSize;
        letter-spacing: 0.3vw;
      }
      .time_col_l_start {
        // font-size: 14px;
        font-size: 1.4 * @fSize;
        padding-top: 2vh;
        letter-spacing: 0.3vw;
        span {
          // font-size: 20px;
          font-size: 2 * @fSize;
          color: #e21919;
        }
      }
    }
    .time_col_r {
      .link {
        display: block;
        padding-top: 10vw;
        position: relative;
        img {
          width: 100%;
          height: auto;
        }
        .time_col_r_price {
          padding: 0.3vh 1.2vw;
          border-radius: 1vw;
          text-align: center;
          position: absolute;
          bottom: 0.8vh;
          right: 1.2vw;
          background-color: #ffaa00;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
  .banner_3 {
    margin-bottom: 25px;
    .banner_3_a {
      margin: 5vh 0;
    }
  }
}
</style>