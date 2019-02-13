<template>
    <div id="category" ref="category">
      <navLeft></navLeft>
      <listRight></listRight>
    </div>   
</template>

<script type='text/ecmascript-6'>

import navLeft from "@/components/Category/navLeft";
import listRight from "@/components/Category/listRight";
export default {
  name: "category",
  components: {
    navLeft,
    listRight
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='less' scoped>
#category {
  position: relative;
  width: 100%;
  height: 628px;
  display: flex;
  overflow: auto;
}
</style>