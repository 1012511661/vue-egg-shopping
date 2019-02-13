<template>
  <div id="navLeft">
    <ul class="nav_ul">
      <li
        v-for="(item,index) in navList"
        :key="index"
        class="nav_li"
        ref="nav_li"
        @click="changeTabIndex(index,item)"
      >
        <router-link to="#" :class="{active:activeNum==index}">{{item.title}}</router-link>
      </li>
      <!-- :class="{active:activeNum==index}" -->
      <!-- :class="activeNum == index ? 'active':''" -->
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
import { Tab, Tabs } from "vant";
export default {
  name: "navLeft",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      activeNum: 0,
      navList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeTabIndex(index,item) {
      // nav 选中
      // this.activeNum = item.index;
      // this.activeNum = (item.ID-1); // 从 0 开始 或者传单击事件传Index
      this.activeNum = (index); // 从 0 开始 或者传单击事件传Index
      // this.$store.dispatch("getCateList", item.ID);
      // this.$store.dispatch("getCateList", item);
      this.$store.dispatch("getCateList", index);
      // this.$store.commit('CATE_LIST',index);
      // console.log(index);
    }
  },
  created() {
    // this.axios
    //   .get(
    //     "https://easy-mock.com/mock/5bd6aef0775106311984f5bc/VVant/CateNavList"
    //   )
    //   .then(res => {
    //     console.log(res.data.dataList)
    //     this.navList = [...res.data.dataList, ...res.data.dataList];
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
      this.axios
      .get(
        "/shopping/categoryNavList"
      )
      .then(res => {
        // console.log(res)
        this.navList = [...res.data, ...res.data];
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
@fSize: 10px;
#navLeft {
  width: 25%;
  height: 100%;
  > ul {
    width: 100%;
    height: 100%;
    padding: 1px 0;
    overflow-y: auto;
    float: left;
    li {
      list-style: none;
      width: 100%;
      border: 1px solid #e6e6e6;
      text-align: left;
      a {
        width: 100%;
        font-size: 14px;
        padding: 1vh 0;
        text-align: center;
        display: inline-block;
        color: #666;
      }
      .active {
        border-left: 2px solid #fd0000;
        background-color: #e6e6e6;
        font-size: 14px;
        font-weight: 800;
        color: #36acb9;
      }
    }
  }
  .nav_ul::-webkit-scrollbar {
    display: none;
  }
}
</style>