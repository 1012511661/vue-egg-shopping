<template>
  <div id="foot" v-if="isFoot">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" @click="page(0)">首页</van-tabbar-item>
      <van-tabbar-item icon="exchange" dot @click="page(1)">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" :info="allCount" @click="page(2)">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="page(3)">我的</van-tabbar-item>
    </van-tabbar>
  </div>
  
</template>

<script type='text/ecmascript-6'>
import { mapState, mapGetters } from "vuex";
import { Row, Col, Icon, Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {},
  data() {
    return {
      active: 0,
      navList: ["首页", "分类", "购物车", "我的"],
      num:0
    };
  },
  computed: {
    ...mapState(["isFoot","allCount"])
  },
  methods: {
    // page(index, title) {
    page(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: "/home" });
          break;
        case 1:
          this.$router.push({ path: "/category" });
          break;
        case 2:
          this.$router.push({ path: "/car" });
          break;
        case 3:
          this.$router.push({ path: "/my" });
          break;
      }
    }
  }
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#foot {
  width: 100%;
  position: fixed;
  z-index: 100;
  border-top: 1px solid #b9b9b9;
  .van-tabs__content {
    display: none !important;
  }
}
</style>