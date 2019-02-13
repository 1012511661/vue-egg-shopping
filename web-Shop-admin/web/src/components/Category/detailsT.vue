<template>
  <div>    
    <sliderImg></sliderImg>
    <textT></textT>
    <imgList></imgList>
    <botBtn></botBtn>  
  </div>
</template>

<script type='text/ecmascript-6'>
import sliderImg from "@/components/Category/Details/sliderImg";
import textT from "@/components/Category/Details/textT";
import imgList from "@/components/Category/Details/imgList";
import botBtn from "@/components/Category/Details/botBtn";
export default {
  name: "detailst",
  components: {
    sliderImg,
    textT,
    imgList,
    botBtn
  },
  created() {
    //请求商品详情数据
    this.$store.dispatch("getCateListActive", this.$route.query.id);
    //head(logo / back)
    this.$store.commit('IS_HEAD_ICON',false);
  },
  beforeRouteLeave(to, from, next) {
    next(this.$store.commit('IS_HEAD_ICON',true));
  }
};
</script>

<style lang='less' scoped>
</style>