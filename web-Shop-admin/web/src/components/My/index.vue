<template>
  <div id="myIndex">
    <!-- 我的订单 -->
    <van-row class="order">
      <van-col span="6">我的订单</van-col>
      <van-col span="10" offset="8" class="icon"><router-link :to="{path:'/outIndex',query:{index:0}}">全部订单 <van-icon name="wap-nav" class="icon-i"/></router-link></van-col>
    </van-row>
    <!-- 图标组 -->
    <van-row class="icon-group">
      <van-col span="6"><van-icon name="gold-coin" /><p>待支付</p></van-col>
      <van-col span="6"><van-icon name="gold-coin" /><p>待收货</p></van-col>
      <van-col span="6"><van-icon name="gold-coin" /><p>待评价</p></van-col>
      <van-col span="6"><van-icon name="gold-coin" /><p>待换修</p></van-col>
    </van-row>
    <!-- 菜单 -->
    <van-row class="menu menu-a">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title"><router-link :to="{path:'/outIndex',query:{index:1}}">会员福利</router-link></van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
    </van-row>
    <van-row class="menu menu-b">
      <router-link :to="{path:'/outIndex',query:{index:2}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">我的优惠</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row>  
    <van-row class="menu menu-c">
      <router-link :to="{path:'/outIndex',query:{index:3}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">我的积分</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row> 
    <van-row class="menu menu-d">
      <router-link :to="{path:'/consigAddress'}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">地址管理</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row>
    <van-row class="menu menu-e">
      <router-link :to="{path:'/outIndex',query:{index:5}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">服务中心</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row>
    <van-row class="menu menu-f">
      <router-link :to="{path:'/outIndex',query:{index:6}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">会员等级</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row> 
    <van-row class="menu menu-g">
      <router-link :to="{path:'/outIndex',query:{index:7}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">个人设置</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row> 
    <van-row class="menu menu-h">
      <router-link :to="{path:'/outIndex',query:{index:8}}">
      <van-col span="4" class="menu-icon"><van-icon name="edit-data" /></van-col>
      <van-col span="6" class="menu-title">系统版本</van-col>
      <van-col span="4" class="menu-more" offset="9"><van-icon name="arrow" /></van-col>
      </router-link>
    </van-row>   

  </div>
</template>

<script type='text/ecmascript-6'>
import { Row, Col, Icon } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  created() {
    this.$store.commit("IS_HEAD", false);
     this.axios
      .get("/shopping/user")
      .then(res => {
       console.log(res.data)
      })
      .catch(err => console.log(err));
  },
  beforeRouteLeave(to, from, next) {
    next(this.$store.commit("IS_HEAD", true));
  }
};
</script>

<style lang='less' scoped>
#myIndex {
  margin-top: 5.5vw;
  background-color: #e3e3e3;
  a {
    display: block;
    color: #383535;
  }
  .van-row {
    background-color: #fff;
  }
  .order {
    font-size: 16px;
    padding: 4vw 2vw;
    border-bottom: 1px solid #d6d4d4;
    a {
      color: #b1b1b1;
      font-size: 14px;
      .icon-i {
        font-size: 14px;
        top: 0.4vw;
      }
    }
  }
  .icon-group {
    padding: 2vw 2vw;
    i {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
  .menu-a,
  .menu-d,
  .menu-g {
    margin-top: 5vw;
  }
  .menu {
    padding: 2vw 2vw;
    border-bottom: 1px solid #d6d4d4;
    .menu-icon {
      font-size: 17px;
      i {
        top: 0.6vw;
      }
    }
    .menu-title {
      font-size: 16px;
    }
    .menu-more {
      font-size: 15px;
      i {
        top: 1vw;
      }
    }
  }
}
</style>