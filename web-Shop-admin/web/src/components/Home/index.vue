<template>
    <div id="index">
        <!-- banner + icon-->
        <banner />  
        <!-- 热门推荐 -->
        <Hot />
        <!-- 特价商品 -->
        <Price />
        <!-- 限时抢购 -->
        <TimeS />
    </div>
</template>

<script type='text/ecmascript-6'>
import Banner from "@/components/Home/banner";
import Hot from "@/components/Home/hot";
import Price from "@/components/Home/price";
import TimeS from "@/components/Home/times";
export default {
  name: "home",
  components: {
    Banner,
    Hot,
    Price,
    TimeS
  }
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#index {
  background: #f0f1f3;
}
</style>