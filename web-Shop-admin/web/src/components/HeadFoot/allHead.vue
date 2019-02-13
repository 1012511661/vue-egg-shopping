<template>
  <!-- top -->
  <div>
    <van-row class="top">
      <van-col span="2" offset="1" v-if="this.$store.state.isHeadIocn">
        <img src="@/assets/images/logo.png" alt class="logo">
      </van-col>

      <van-col span="2" v-else>
        <van-icon name="arrow-left" class="back" @click="back"/>
      </van-col>

      <van-col span="8" class="title">
        <span>商城名字</span>
      </van-col>
      <van-col span="2" offset="10" class="seach-d">
        <van-icon name="search" class="search" @click="search"/>
      </van-col>
    </van-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Row, Col, Icon } from "vant";
export default {
  name: "headT",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  methods: {
    search() {
      alert("搜索页面");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scoped>
@fSize: 10px;
.top {
  width: 98vw;
  padding: 1.5vh 1vw;
  position: fixed;
  z-index: 5;
  background: #f5f0f0;
  .logo {
    width: 8vw;
    height: auto;
  }
  .back {
    font-size: @fSize*2.2;
    top: 0.6vw;
  }
  .title {
    span {
      font-size: @fSize*2;
    }
  }
  .seach-d {
    float: right;
    margin-right: 1vw;
    .search {
      font-size: @fSize*2;
      padding-top: @fSize*.3;
    }
  }
}
</style>