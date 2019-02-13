<template>
<!--内容-->
    <div>
      <!-- 头 -->
      <headT />
      <!-- 内容 -->
      <div class="content">
        <keep-alive>
          <transition name="anim" mode="out-in"> <!-- transition 动画-->
            <router-view></router-view>
          </transition>
        </keep-alive>       
      </div>
      <!-- 尾 -->
      <foot />
    </div>     
</template>

<script type='text/ecmascript-6'>
//head
import headT from "@/components/HeadFoot/head";
//foot
import Foot from "@/components/HeadFoot/foot";
export default {
  components:{
    headT,
    Foot,
  }
}
</script>

<style lang='less' scoped>

</style>