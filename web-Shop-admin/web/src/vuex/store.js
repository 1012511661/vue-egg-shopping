import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
import * as types from "@/vuex/types";
Vue.use(Vuex);

const state = {
  isRge: true, // 注册页面
  isIndex: true, // 主页
  cateListIndex: 0, // 分类列表ID
  cateList: [], // 分类商品列表
  cateListActive: [], // 商品详情
  cateShopAdd: [], // 网购物车添加的商品
  carListNum: [], // 购物车数量
  carNum: 0, // 购物车数量
  isFoot: true, // 底部按钮
  isHead: true, // head切换(个人中心和其他主页的区别)
  isHeadIocn: true, // head(logo / back)
  allPrice: 0, // 总价格
  allCount: 0, // 总数量
  addNum: 1, // ++
  redNum: 1, // --
  isConsigAdd: true, // 收件人列表/添加收货人 切换.

  isConsigAddOr: true,
  isConsigAddtype: 0,

  consigList: [
    {
      list: []
    },
    {
      disList: []
    }
  ], // 收件人列表
  addresObj: {}, // 收件人(更改/添加)
  okAddPeople: {} // 默认收件人
};
const getters = {
  cateList: state => state.cateList,
  cateListActive: state => state.cateListActive
};
const mutations = {
  [types.IS_REG](state, res) {
    state.isRge = res;
  },
  [types.IS_INDEX](state, res) {
    state.isIndex = res;
  },
  [types.CATE_LIST](state, { index, list }) {
    state.cateListIndex = index;
    // state.cateList = [...list, ...list];
    state.cateList = list;
  },
  [types.CATE_LIST_ACTIVE](state, active) {
    state.cateListActive = active;
    state.cateShopAdd = state.cateListActive.concat();
    state.allCount = state.cateShopAdd.length();
  },
  [types.CATE_SHOP_ADD](state, { color, size }) {
    state.cateShopAdd[0].color = color;
    state.cateShopAdd[0].size = size;
  },

  [types.CATE_ADD](state) {
    state.carNum++;
  },
  [types.CATE_RED](state, res) {
    state.carListNum[res]--;
  },
  [types.IS_FOOT](state, res) {
    state.isFoot = res;
  },
  [types.IS_HEAD](state, res) {
    state.isHead = res;
  },
  [types.IS_HEAD_ICON](state, res) {
    state.isHeadIocn = res;
  },
  [types.ALL_PRICE](state, res) {
    state.allPrice = res;
  },
  [types.ALL_COUNT](state, res) {
    state.allCount = res;
  },
  // [types.RED_NUM](state, res) {
  //   state.redNum = res;
  // },
  // [types.ADD_NUM](state, res) {
  //   state.addNum = res;
  // }
  [types.iS_CONSIG_ADD](state, res) {
    state.isConsigAdd = res;
  },
  [types.iS_CONSIG_OR](state, { res, type }) {
    state.isConsigAddOr = res;
    state.isConsigAddtype = type;
  },

  [types.ADDRESSEDIT](state, { item, index }) {
    state.consigList[0].list[index] = item;
    state.addresObj = item;
  },
  [types.CONSIGLIST](state, { list, disList }) {
    state.consigList[0].list = list;
    state.consigList[1].disList = disList;
  },
  [types.OK_ADD](state, item) {
    state.okAddPeople = item;
  }
};
const actions = {
  // getCateList({ commit }, index) {
  getCateList(context, index) {
    let ID = index + 1;
    //获取商品列表
    axios
      .get(`/shopping/categoryDataList?id=${ID}`)
      .then(res => {
        let list = res.data;
        // context.commit(types.CATE_LIST, list);
        context.commit(types.CATE_LIST, {
          index,
          list
        });
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  getCateListActive(context, index) {
    //获取商品详情
    // window.console.log(this.state.cateListIndex, "一级ID"); //一级ID
    window.console.log(index, "二级ID"); //二级ID
    let ID = index;
    axios
      .get(`/shopping/goodsDetails?id=${ID}`)
      .then(res => {
        let acitve = res.data;
        context.commit(types.CATE_LIST_ACTIVE, acitve);
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  getConsigList(context) {
    // 收件人地址
    axios
      .get(`/shopping/AddressList`)
      .then(res => {
        let list = res.data;
        let disList = [
          {
            id: "3",
            name: "王五",
            tel: "13000000000",
            province: "陕西",
            city: "西安",
            county: "碑林区",
            areaCode: "120000",
            address: "陕西省西安市碑林区文三路 138 号东方通信大厦 7 楼 501 室",
            postalCode: "456789"
          }
        ];
        context.commit(types.CONSIGLIST, {
          list,
          disList
        });
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  redNum({ commit }, index) {
    commit(types.CATE_RED, index);
  },
  addNum({ commit }) {
    commit(types.CATE_ADD);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
