<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(img, index) in imageList" :key="index">
        <img v-lazy="img" />
      </van-swipe-item>
    </van-swipe>
    <!-- <img v-for="(img,index) in imageList" :key="index" v-lazy="img" > -->
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters} from "vuex";
import { Swipe, SwipeItem } from "vant";
export default {
  name: "sliderImg",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {},
  data() {
    return {
      imageList: []
    };
  },
  watch: {
    cateListActive: {
      handler: function(val) {
        // this.imageList = val[0].bannerList;
        this.imageList = val[0].icon_src;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["cateListActive"]),
  },
  methods: {},
  created() {},
  mounted() { }
};
</script>

<style lang='less' scoped>
img {
  width: 100%;
}
</style>