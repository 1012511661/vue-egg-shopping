<template>
  <Login v-if="isRge" />
  <Reg v-else/>
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
//login
import Login from "@/components/LogReg/log";
//reg
import Reg from "@/components/LogReg/reg";
export default {
  components:{
    Login,
    Reg
  },
  computed:{
    ...mapState(["isRge", "isIndex"])
  }
}
</script>

<style lang='less' scoped>

</style>