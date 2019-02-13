import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);

// Router.beforeEach((to, from, next) => {
//   if (to.name == "car") {
//     next();
//   }
//   next();
// });
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      //首页
      path: "/home",
      component: () =>
        import(/* webpackChunkName: "index" */ "@/components/Home/index"),
      name: "home",
      meta: {
        isFoot: true
      }
    },
    {
      //分类
      path: "/category",
      component: () =>
        import(/* webpackChunkName: "category" */ "@/components/Category/index"),
      name: "category"
    },
    {
      //商品详情
      path: "/detailst",
      component: () =>
        import(/* webpackChunkName: "category" */ "@/components/Category/detailsT"),
      name: "detailsT"
    },
    {
      //购物车
      path: "/car",
      component: () =>
        import(/* webpackChunkName: "car" */ "@/components/Car/index"),
      name: "car",
      meta: {
        login: true
      }
    },
    {
      //支付页面
      path: "/pay",
      component: () =>
        import(/* webpackChunkName: "car" */ "@/components/Car/pay"),
      name: "pay"
    },
    {
      //收货人列表
      path: "/consigAddress",
      component: () =>
        import(/* webpackChunkName: "car" */ "@/components/Car/ConsigAddress/consigAddress"),
      name: "consigAddress"
    },
    {
      //个人中心
      path: "/my",
      component: () =>
        import(/* webpackChunkName: "index" */ "@/components/My/index"),
      name: "my"
    },
    {
      //订单页面
      path: "/outIndex",
      component: () =>
        import(/* webpackChunkName: "index" */ "@/components/My/outIndex"),
      name: "outIndex"
    }
  ]
});
