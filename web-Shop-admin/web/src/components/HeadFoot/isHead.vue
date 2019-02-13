<template>
  <div>
    <all-head v-if="isHead"></all-head>
    <my-head v-else></my-head>
  </div>
</template>

<script type='text/ecmascript-6'>
//head 通用
import allHead from "@/components/HeadFoot/allHead";
//head 个人中心
import myHead from "@/components/HeadFoot/myHead";
import { mapState } from "vuex";
export default {
  components:{
    allHead,
    myHead
  },
  watch:{},
  computed:{
    ...mapState(["isHead"])
  }
}
</script>

<style lang='less' scoped>

</style>