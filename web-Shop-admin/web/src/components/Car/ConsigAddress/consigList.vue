<template>
  <div id="consigList">
    <van-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"
    @add="onAdd"
    @edit="onEdit"
    @select="select"
  />
  </div> 
</template>

<script type='text/ecmascript-6'>
import { mapState } from "vuex";
import { AddressList } from "vant";
export default {
  name: "consigList",
  components: {
    [AddressList.name]: AddressList
  },
  props: {},
  data() {
    return { 
      // chosenAddressId: "1",
      chosenAddressId: 2,
      list: [],
      disabledList: []
    };
  },
  watch: {
    consigList: {
      handler: function(val) {
        this.list = val[0].list;
        this.disabledList = val[1].disList;
      },
      deep: true
    }
  },
  mounted(){
    this.getchosenAddressId()
  },
  created(){
    this.$store.dispatch("getConsigList");
    // this.getchosenAddressId()

  },
  computed: {
    ...mapState(["consigList"])
  },
  methods: {
    getchosenAddressId(){ // 判断默认地址
      this.$store.state.consigList[0].list.filter((v,k)=>{
        if(v.isDefault == '1'){
          this.chosenAddressId = `${k+1}`;
        }
      })
    },
    onAdd() {// 添加新的收货人信息
      this.$store.commit("ADDRESSEDIT", {}); 
      // this.$store.commit("iS_CONSIG_ADD", false);
      this.$store.commit("iS_CONSIG_OR", {res:false,type:1});// 1 添加
    },
    onEdit(item, index) {// 修改选择的收货人信息
      // console.log(item,index)
      this.$store.commit("ADDRESSEDIT", { item, index }); 
      this.$store.commit("iS_CONSIG_OR", {res:false,type:0});// 1 修改
      // this.$store.commit("iS_CONSIG_ADD", false);
    },
    select(item,index){
      this.$store.commit("OK_ADD", item); 
      console.log(item,'132456')
    }
  }
};
</script>

<style lang='less' scoped>
</style>