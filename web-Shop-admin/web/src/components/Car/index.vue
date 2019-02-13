<template>
  <div id="car">
    <!-- banner -->
    <van-row class="banner">
      <van-col span="24">
        <img src="http://dummyimage.com/400x200/ffcc33/FFF.png" alt>
      </van-col>
    </van-row>
    <!-- 18792819189 -->
    <!-- 购物车有 -->
    <ul class="carList" v-if="!isFoot">
      <li class="carList_li" v-for="(item,index) in shopList" :key="index">
        <van-row>
          <van-col span="4" class="list-checked">
            <van-checkbox v-model="item.checked" class="list-left"></van-checkbox>
          </van-col>
          <van-col span="6" class="list-img">
            <img :src="item.icon_index" alt>
          </van-col>
          <van-col span="8" class="list-right">
            <p class="right_title">{{item.title}}</p>
            <p style="color:rgb(199, 108, 28)" class="right_size">{{item.color}} - {{item.size}}</p>
            <p class="right_price">售价：{{item.price}}元</p>
          </van-col>
          <van-col span="6" class="list-setBtn">
            <span class="btn" @click="red(index)">--</span>
            <span class="num">{{item.num}}</span>
            <span class="btn" @click="add(index)">++</span>
            <span class="del">
              <van-icon name="delete" @click="del(index)"/>
            </span>
          </van-col>
        </van-row>
      </li>
    </ul>
    <!-- 购物车空 -->
    <div class="noShop" v-else>
      <img src="https://dummyimage.com/600x400/40E0D0/FFF.png&text=go%20Shopping" alt>
      <router-link :to="{name:'category'}" class="btn_go">去购物</router-link>
    </div>

    <van-row class="bot-grop">
      <van-col span="8" class="grop-price">
        <span class="price-len">共{{count}}件</span>
        <span class="price-price">{{total}}元</span>
      </van-col>
      <van-col span="8" class="grop-shop">
        <router-link :to="{name:'category'}" class="grop-link">
          <span>继续购物</span>
        </router-link>
      </van-col>
      <van-col span="8" class="grop-total">
        <!-- <router-link :to="{path:'/pay'}" @click="getMony">去结算</router-link> -->
        <!-- <router-link to="#">
          <span @click="getMony">去结算</span>
        </router-link> -->
        <span @click="getMony">去结算</span>
      </van-col>
    </van-row>
    <!-- 弹框 1 -->
    <van-popup v-model="show" position="bottom" class="msg_del">
      <p>是否删除该商品</p>
      <span class="yes">
        <van-icon name="passed" @click="delY(index)"/>
      </span>
      <span class="no">
        <van-icon name="close" @click="delN"/>
      </span>
    </van-popup>
    <!-- 弹框 2  -->
    <!-- <van-popup v-model="show" position="bottom" class="msg_del">
        <p></p>
    </van-popup>-->
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import { Row, Col, Icon, Checkbox, CheckboxGroup, Popup } from "vant";
export default {
  name: "car",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup
  },
  data() {
    return {
      shopList: [],
      shopListLen: false, // 判断购物车空/有
      show: false
    };
  },
  computed: {
    ...mapState(["isFoot"]),
    total() {
      // 总价
      let Price = 0;
      for (let i in this.shopList) {
        if (this.shopList[i].checked) {
          Price += this.shopList[i].price * this.shopList[i].num;
        }
      }
      this.$store.commit("ALL_PRICE", Price.toFixed(2));
      return Price.toFixed(2);
    },
    count() {
      // 总数
      let Num = 0;
      for (let i in this.shopList) {
        if (this.shopList[i].checked) {
          Num += parseInt(this.shopList[i].num);
        }
      }
      this.$store.commit("ALL_COUNT", Num);
      return Num;
    }
  },
  methods: {
    red(index) {
      // 减
      this.shopList[index].checked = true;
      if (this.shopList[index].num > 1) {
        this.shopList[index].num--;
      } else {
        this.show = !this.show;
      }
    },
    add(index) {
      // 加
      this.shopList[index].checked = true;
      this.shopList[index].num++;
    },
    del(index) {
      // 删除
      console.log(index);
      this.shopList.splice(index, 1);
    },
    delY(index) {
      // 弹框删除
      this.del(index);
      this.show = false;
    },
    delN() {
      // 取消
      this.show = false;
    },
    getMony(){
        let params = this.shopList;
        this.axios
          .post("/shopping/payCar", {
            params,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
          this.$router.push({name:'pay'});
    },
    // async getMony() {
    //   await this.payCarList();
    // },
    // payCarList() {
    //   return new Promise((resolve, reject) => {
    //     // let newArr = [].concat(JSON.parse(JSON.stringify(this.shopList))); // 深拷贝
    //     let shopListUpdate = this.shopList.map((v, k) => {
    //       var newObj = {};
    //       newObj.ID = v.ID;
    //       newObj.num = v.num;
    //       newObj.checked = v.checked ? 1 : 0;
    //       // newObj.checked = v.checked;
    //       return newObj;
    //     });
    //     let params = shopListUpdate;
    //     this.axios
    //       .post("/shopping/payCar", {
    //         params,
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //       })
    //       .then(res => {
    //         console.log(res);
    //         console.log(1)
    //         // console.log(this.$router,'6666')
    //         // this.$router.push({name:'pay'});
    //       })
    //       .catch(err => {
    //         console.log(2)
    //         console.log(err);
    //       });
    //       this.$router.push({name:'pay'});
    //   });
    // }
  },
  created() {
    this.axios
      .get(`/shopping/carList`)
      .then(res => {
        this.shopList = res.data;
        // 获取购物车列表长度,用来判断底部显示或者隐藏，并同时显示页面循环商品列表还是提醒去购物(可以少写一个state)
        if (this.shopList.length >= 1) {
          this.$store.commit("IS_FOOT", false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // 获取购物车列表长度,用来判断底部显示或者隐藏，并同时显示页面循环商品列表还是提醒去购物(可以少写一个state)
    if (this.shopList.length >= 1) {
      console.log(this.shopList);
      console.log(this.shopList.length);
      this.$store.commit("IS_FOOT", false);
    }
  },
  beforeRouteLeave(to, from, next) {
    next(this.$store.commit("IS_FOOT", true));
  }
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#car {
  .banner {
    img {
      width: 100%;
    }
  }
  .noShop {
    margin-top: 5vh;
    position: relative;
    img {
      width: 100%;
    }
    .btn_go {
      position: absolute;
      left: 80%;
      bottom: 2vh;
      border-radius: 30%;
      padding: 3vw;
      background-color: #e6e6e6;
      color: #ef062f;
    }
  }
  .carList {
    height: 380px;
    overflow-y: auto;
    .carList_li {
      padding: 1vh 1vw;
      .list-checked {
        margin-top: 9vw;
      }
      .list-img {
        img {
          width: 100%;
        }
      }
      .list-right {
        .right_title {
          padding: 1vw 2vw;
          font-size: @fSize*1.4;
          text-align: left;
        }
        .right_size {
          padding-left: 4vw;
          font-size: @fSize*1.3;
          text-align: left;
        }
        .right_price {
          padding: 6vw 2vw 0;
          font-size: @fSize*1.3;
          text-align: left;
        }
      }
      .list-setBtn {
        margin-top: 7vw;
        .num {
          display: inline-block;
          width: 6vw;
          font-size: 15px;
          padding: 0.5vw;
          border: 1px dashed #929afd;
        }
        .btn {
          display: inline-block;
          width: 6vw;
          background-color: #e3e3e3;
          font-size: 15px;
          padding: 0.5vw 1vw;
        }
        .del {
          display: inline-block;
          padding: 4vw 0 0;
          margin-left: 70%;
          font-size: 18px;
        }
      }
    }
  }
  .bot-grop {
    position: absolute;
    width: 100%;
    bottom: -5px;
    .grop-price {
      height: 13vw;
      position: relative;
      background-color: #e2e2e2;
      .price-len {
        position: absolute;
        left: 1vw;
        /* top: 1vw; */
        color: #000000;
      }
      .price-price {
        font-size: 18px;
        top: 45%;
        right: 25%;
        position: absolute;
        color: #0e2120;
      }
    }
    .grop-shop,
    .grop-total {
      background-color: #e6d53b;
      height: 13vw;
      .grop-link {
        display: inline-block;
      }
      a {
        line-height: 13vw;
        font-size: 16px;
        color: #f32d70;
      }
    }
    .grop-total {
      background-color: pink;
      span{
        line-height: 13vw;
        font-size: 16px;
        color: #f32d70;
      }
    }
  }
  .msg_del {
    height: 18%;
    p {
      font-size: 18px;
      padding: 6vw 3vw 4vw;
    }
    .yes,
    .no {
      display: inline-block;
      font-size: 30px;
      padding: 3vw;
    }
    .no {
      margin-left: 13vw;
    }
  }
}
</style>