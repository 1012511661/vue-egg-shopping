<template>
  <div>
    <!-- <consigList v-if="isConsigAdd"></consigList> -->
    <consigList v-if="isConsigAddOr"></consigList>
    <addressEdit v-else></addressEdit>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import consigList from "@/components/Car/ConsigAddress/consigList";
import addressEdit from "@/components/Car/ConsigAddress/addressEdit";
export default {
  name:"consigAddress",
  components:{
    consigList,addressEdit
  },
  data(){
    return {}
  },
  computed:{
    ...mapState(["isConsigAdd","isConsigAddOr"])
  },
  // created(){
  //   this.$store.commit('IS_HEAD_ICON',false); //head(logo / back)
  // },
  // beforeRouteLeave(to, from, next) {
  //   next(this.$store.commit('IS_HEAD_ICON',true));
  // }
}
</script>

<style lang='less' scoped>

</style>