<template>
  <div id="hot">
    <!-- 热门推荐 -->
    <van-row class="hot">
      <van-col span="10" offset="6"><span class="hot_tit">热门推荐</span></van-col>
      <router-link :to="{path: '/category'}">
        <van-col span="3" offset="4" class="hot_f"><van-icon name="add-o" class="hot_iocn"/></van-col>
      </router-link>
    </van-row>
    <!-- 热门商品 -->
    <van-row class="hot_goods">
      <van-col span="12" class="hot_goods_col" v-for="(img,index) in imagesList" :key="index">
      <router-link :to="{path: '/detailst',query:{id:index}}" >
      <!-- <router-link :to="{path: '/detailst',query:{id:ID}}" > -->
        <img v-lazy="img.icon_index" >
        <!-- <img :src="img.url" alt=""> -->
        <p class="tit" :text="img.title">{{img.title}}</p>
      </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Row, Col, Icon } from "vant";
export default {
  name: "hot",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  props: {},
  data() {
    return {
      imagesList: []
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.axios
      .get("/shopping/homeHotList")
      .then(res => {
        this.imagesList = res.data
      })
      .catch(err => console.log(err));
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#hot {
  margin-top: 3vh;
  padding-bottom: 1vh;
  background: #fff;
  .hot {
    padding: 4vw 0;
    .hot_tit {
      font-size: @fSize*1.8;
      // background: linear-gradient(to right, red, blue);
      // background-clip: text;
    }
    .hot_f {
      height: 24px;
      line-height: 24px;
      .hot_iocn {
        font-size: @fSize*1.8;
      }
    }
  }
  .hot_goods {
    .hot_goods_col {
      padding: 1vw 1vh;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tit {
        font-size: 14px;
        color: #5b6671;
        padding: 1vh 2vw 0;
      }
      .tit:before {
        content: attr(text);
        position: absolute;
        z-index: 10;
        color: #ff002d;
        mask: linear-gradient(to left, red, transparent);
      }
    }
  }
}
</style>