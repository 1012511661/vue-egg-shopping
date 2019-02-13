<template>
  <div id="app">
    <!-- 登录/注册 -->
    <logReg  v-show="isIndex"></logReg>
    <!-- 首页 -->
    <Home v-show="!isIndex"></Home>
  </div>
</template>

<script type='text/ecmascript-6'>
//Home
import Home from "@/views/Home";
// log/reg
import logReg from "@/views/logReg";

import { mapState } from "vuex";
export default {
  components: {
    Home,
    logReg
  },
  computed: {
    ...mapState(["isIndex"])
  }
};
</script>


<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  padding-top: 7.5vh;
}
//动画
.anim-enter {
  //进入
  transform: translateX(100%);
}
.anim-enter-to {
  //进入后
  transform: translateX(0);
}
.anim-enter-active {
  //进入动画的时间
  transition: 0.5s;
}
@keyframes bounce {
  0% {
    transform: translate3d(0, -25px, 0);
    opacity: 0;
  }
  25% {
    transform: translate3d(0, 10px, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
  75% {
    transform: translate3d(0, 2px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.anim-leave {
  //离开前
  transform: translateX(0);
}
.anim-leave-to {
  //离开后
  transform: translateX(-100%);
}
.anim-leave-active {
  //离开动画的时间
  transition: 0.5s;
}
</style>

