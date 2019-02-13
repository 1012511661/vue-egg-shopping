<template>
  <div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="service"/>
      <van-goods-action-mini-btn icon="cart" text="购物车" :info="allCount" @click="goCar"/>
      <van-goods-action-mini-btn icon="shop" text="店铺" @click="shop"/>
      <van-goods-action-big-btn text="加入购物车" @click="addCar(cateShopAdd)"/>
      <van-goods-action-big-btn text="立即购买" primary @click="buy"/>
    </van-goods-action>
    <!-- 提醒框 -->
    <van-popup v-model="show" position="bottom" class="msg_del">
      <p>请选择商品的型号</p>
    </van-popup>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Popup
} from "vant";
export default {
  name: "botBtn",
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Popup.name]: Popup
  },
  props: {},
  data() {
    return {
      show: false
    };
  },
  watch: {},
  computed: {
    ...mapState(["isFoot", "allCount", "cateShopAdd"])
  },
  methods: {
    service() {
      //客服
      alert("联系客服");
    },
    goCar() {
      //去购物车
      // alert("去购物车");
      this.$router.push({ path: "/car" });
    },
    shop() {
      //查看店铺
      alert("查看店铺");
    },
    async addCar(cateShopAdd) {
      //加入购物车
      // console.log(cateShopAdd[0]);
      if ("color" in cateShopAdd[0] &&"size" in cateShopAdd[0] &&cateShopAdd[0].size != "" &&cateShopAdd[0].color != ""
      ) { // 存在并且有值
        await this.addCarShop(cateShopAdd);
      } else {
        this.show = !this.show;
      }
    },
    addCarShop(cateShopAdd) {
      return new Promise((resolve, reject) => {
        let params = cateShopAdd;
        this.axios
          .post("/shopping/addCar", {
            params,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            this.navList = [...res.data, ...res.data];
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    buy() {
      //立即购买
      alert("立即购买  go");
    }
  },
  mounted() {
    this.$store.commit("IS_FOOT", false);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("IS_FOOT", true);
    //next(this.$store.commit("IS_FOOT", true));
  }
};
</script>

<style lang='less' scoped>
.msg_del {
  padding: 10vw;
  font-size: 18px;
}
</style>