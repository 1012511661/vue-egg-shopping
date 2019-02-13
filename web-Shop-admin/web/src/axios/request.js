import axios from "axios";
// import cookies from "vue-cookies";
// import router from "vue-router";
export const $axios = axios.create({
  // 这里是配置项
  timeout: 7000
});

// 拦截请求
$axios.interceptors.request
  .use
  //   config => {
  //     window.console.log(config);
  //     let t = cookies.get("t");
  //     if (t) {
  //       config.headers.t = t;
  //     } else {
  //       router.replace({ path: "/login" });
  //     }
  //     return config;
  //   },
  //   err => {
  //     return Promise.reject(err);
  //   }
  ();

// 拦截响应
$axios.interceptors.response.use(
  response => {
    window.console.log("123456");
    window.console.log(response);
    return response;
  },
  err => {
    window.console.log(err);
    // if (err.response) {
    //   switch (err.response.status) {
    //     case 401:
    //       // 这里写清除token的代码
    //       router.replace({
    //         path: "login",
    //         query: { redirect: router.currentRoute.fullPath } // 登录成功后跳入浏览的当前页面
    //       });
    //   }
    // }
    return Promise.reject(err);
  }
);
