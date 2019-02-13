<template>
  <div id="listRight">
    <ul>
      <li v-for="(item,index) in dataList" :key="index">
        <!-- <router-link :to="{path: '/detailst',query:{id:index}}" class="to"> -->
        <router-link :to="{path: '/detailst',query:{id:item.ID}}" class="to">
          <img alt v-lazy="item.icon_index">
          <!-- <span class="tit">{{item.title}}, {{cateListIndex}}</span> -->
          <span class="tit">{{item.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapState, mapGetters } from "vuex";
import { Row, Col, Icon } from "vant";
export default {
  name: "listRight",
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  props: {},
  data() {
    return {
      dataList: []
    };
  },
  watch: {
    cateList: {
      handler: function(val, oldVal) {
        this.dataList = val;
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["cateListIndex", "cateList"])
  },
  methods: {
    getJson() {
      this.axios
        .get(
          `/shopping/categoryDataList?id=1`
        )
        .then(res => {
          this.dataList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getJson();
  }
};
</script>

<style lang='less' scoped>
#listRight {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: static;
  width: 74.9%;
  > ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #f7f7f7;
    li {
      background-color: #f7f7f7;
      width: 33%;
      text-align: center;
      display: inline-block;
      a {
        color: #666;
        display: block;
        img {
          display: block;
          width: 85%;
          padding: 3vw 2vw;
        }
        span {
          text-align: center;
        }
      }
    }
  }
}
#listRight::-webkit-scrollbar {
  display: none;
}
</style>