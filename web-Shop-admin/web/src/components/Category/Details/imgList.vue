<template>
  <div id="imgList">
    <img v-for="(url,index) in imgList" :key="index" v-lazy="url" >
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from "vuex";
export default {
  name: "imgList",
  components: {},
  props: {},
  data() {
    return {
      imgList: []
    };
  },
  watch: {
    cateListActive: {
      handler: function(val, oldVal) {
        // this.imgList = val[0].imgList;
        this.imgList = val[0].icon_pic;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["cateListActive"])
  }
};
</script>

<style lang='less' scoped>
#imgList {
  img {
    width: 100%;
  }
}
</style>