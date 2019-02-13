<template>
    <div id="myHead">
        <div>
            <p><img src="@/assets/images/logo.png" alt=""></p>
            <strong>名字</strong>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {
      bcImg: "@/assets/images/logo.png"
    };
  }
};
</script>

<style lang='less' scoped>
#myHead {
  div {
    width: 98vw;
    padding: 2vh 1vw;
    position: fixed;
    z-index: 5;
    background-color: #ff8a00;
    text-align: left;
    p {
      display: inline-block;
      width: 10vw;
      height: 10vw;
      background-color: #ffffff;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-left: 3vw;
      img {
        width: 90%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    strong {
      vertical-align: top;
      height: 10vw;
      line-height: 10vw;
      padding-left: 3vw;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>