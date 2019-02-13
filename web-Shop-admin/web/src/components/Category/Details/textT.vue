<template>
  <div id="textT">
    <!-- 名字 -->
    <div class="textT-title">
      <h1>{{textT}}</h1>
    </div>
    <!-- 描述 -->
    <div class="textT-text">
      <h2>{{shopText}}</h2>
      <span v-if="msg">(已选 {{colText}} {{sizeText}})</span>
    </div>
    <div class="textT-btn">
      <!-- 颜色 -->
      <div>
        <ul>
          <li
            v-for="(item,index) in colList"
            :key="index"
            :class="colIndex==index?'colSelected':''"
            @click="colChose(index)"
          >{{item}}</li>
        </ul>
      </div>
      <!-- 型号 -->
      <div>
        <ul>
          <li
            v-for="(item,index) in sizeList"
            :key="index"
            :class="sizeIndex==index?'colSelected':''"
            @click="sizeChose(index)"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from "vuex";
export default {
  name: "textt",
  components: {},
  props: {},
  data() {
    return {
      msg: false, // 选择的型号提醒
      colList: [], // 颜色
      sizeList: [], // 大小
      colIndex: -1, // 选中颜色index
      sizeIndex: -1, // 选中大小index
      colText: "", // 页面展示颜色
      sizeText: "", // 页面展示大小
      shopText: "", // 介绍
      textT: "" // 商品名
    };
  },
  watch: {
    cateListActive: {
      handler: function(val) {
        this.colList = val[0].colorList;
        this.sizeList = val[0].sizeList;
        this.shopText = val[0].content;
        this.textT = val[0].title;
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["cateListActive"])
  },
  // created(){
  //   this.msg = true;
  //   this.colIndex = 0;
  //   this.sizeIndex = 0;
  //   this.colText = this.colList[0];
  //   console.log(this.colText)
  //   this.sizeText = this.sizeList[0];
  // },
  methods: {
    colChose(index) {
      this.msg = true;
      this.colIndex = index;
      this.colText = this.colList[index];
      // this.sizeText = this.sizeList[0];
      this.$store.commit('CATE_SHOP_ADD',{color:this.colText,size:this.sizeText});
    },
    sizeChose(index) {
      this.msg = true;
      this.sizeIndex = index;
      this.sizeText = this.sizeList[index];
      this.$store.commit('CATE_SHOP_ADD',{color:this.colText,size:this.sizeText});
    }
  }
};
</script>

<style lang='less' scoped>
// @import "@/assets/all.less";
@fSize: 10px;

#textT {
  .textT-title {
    h1 {
      padding: 2vw;
      text-align: left;
      border-bottom: 1px inset;
    }
  }
  .textT-text {
    h2 {
      text-align: left;
      padding: 4vw 2vw;
    }
    span {
      width: 96%;
      color: pink;
      text-align: right;
      padding: 1vw 2%;
      font-size: @fSize*1.6;
      display: inline-block;
    }
  }
  .textT-btn {
    div {
      margin: 5vw 0;
      ul {
        text-align: left;
        li {
          padding: 6px 10px;
          border: 1px solid rgb(111, 111, 111);
          margin: 2vw 2vw;
          color: rgb(111, 111, 111);
          display: inline-block;
        }
      }

      .colSelected {
        display: inline-block;
        color: #ffaa00;
        border-color: #ffaa00;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
      }
    }
  }
}
</style>