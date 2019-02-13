<template>
  <div id="price">
    <!-- banner -->
    <van-row class="banner">
      <van-col span="24">
        <img src="http://dummyimage.com/400x100/ffcc33/FFF.png&text=s1-banner" alt="">
        </van-col>
    </van-row>
    <div class="price-list">
      <ul>
        <li class="img_div" v-for="(img,index) in priceList" :key="index" >
          <router-link :to="{path: '/detailst',query:{id:index}}" >
            <img :src="img.icon_index" alt="" class="img_div_img">
            <p class="title">{{img.title}}</p>
            <p class="price">￥{{img.price}}</p>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script type='text/ecmascript-6'>
import { Row, Col, Icon, NoticeBar } from "vant";
export default {
  name: "price",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar
  },
  props: {},
  data() {
    return {
      priceList: [],
    };
  },
  created(){
    this.axios
      .get("/shopping/homePriceList")
      .then(res => {
        this.priceList = res.data
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang='less' >
@fSize: 10px;
#price {
  padding-top: 3vh;
  .banner {
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .price-list {
    overflow-x: auto;
    width: 100%;
    /*原生滑动*/
    -webkit-overflow-scrolling: touch;
    > ul {
      display: flex;
      padding: 6vw;
      li {
        padding-right: 10vw;
        min-width: 21vw;
        a,img {
          display: block;
          width: 100%;
        }
        p {
          float: left;
        }
        .title {
          color: #576282;
          font-size: @fSize*1.6;
          width: 100%;
        }
        .price {
          color: #ef0b0b;
          width: 100%;
          text-align: right;
        }
      }
    }
  }
}
</style>