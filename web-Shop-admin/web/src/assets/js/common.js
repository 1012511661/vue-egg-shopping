/**
 *  插件的辨析
 */
let common = {
  //存储 利用localStorage
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //获取
  fetch(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
  }
};
export default {
  install: function(Vue) {
    Vue.prototype.$localHost = common;
  }
};
