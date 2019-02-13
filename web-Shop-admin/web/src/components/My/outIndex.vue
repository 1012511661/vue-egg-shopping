<template>
    <div id="outIndex">
        <order v-if="index == 0"></order>
        <vip v-else-if="index == 1"></vip>
        <preferential v-else-if="index == 2"></preferential>
        <integral v-else-if="index == 3"></integral>
        <service v-else-if="index == 5"></service>
        <vipReg v-else-if="index == 6"></vipReg>
        <set v-else-if="index == 7"></set>
        <version v-else></version>
    </div>
</template>

<script type='text/ecmascript-6'>
import order from "@/components/My/order"; //我的订单
import vip from "@/components/My/vip"; //会员中心
import preferential from "@/components/My/preferential"; //我的优惠
import integral from "@/components/My/integral"; //我的积分
import service from "@/components/My/service"; //服务中心
import vipReg from "@/components/My/vipReg"; //会员等级
import set from "@/components/My/set"; //个人设置
import version from "@/components/My/version"; //系统版本
export default {
  name: "outIndex",
  components: {
    order,
    integral,
    preferential,
    service,
    set,
    version,
    vip,
    vipReg
  },
  props: {},
  data() {
    return {
      index: 0
    };
  },
  created() {
    this.$store.commit("IS_HEAD", false);
    this.index = this.$route.query.index;
  },
  beforeRouteLeave(to, from, next) {
    next(this.$store.commit("IS_HEAD", true));
  }
};
</script>

<style lang='less' scoped>
#outIndex {
  margin-top: 5.5vw;
  background-color: #e3e3e3;
}
</style>