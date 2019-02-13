<template>
    <div id="order">订单{{msg}}</div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: "order",
  components: {},
  props: {},
  data() {
    return {
      msg:""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.$store.commit("IS_HEAD", false);
  },
  beforeRouteLeave(to, from, next) {
    next(this.$store.commit("IS_HEAD", true));
  }
};
</script>

<style lang='less' scoped>
</style>