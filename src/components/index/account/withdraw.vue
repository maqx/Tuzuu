<template>
  <div class="withdraw">
    <back-btn title="提现"></back-btn>
    <div class="detail">
      <el-row>
        <el-col>提现到支付宝</el-col>
        <el-col>可提现金额：<span class="red-txt">0</span>元</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import backBtn from '../public/back.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    name: 'order',
    components:{
      ElCol,
      ElRow,
      backBtn
    },
    data () {
      return {

      }
    },
    methods: {

    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-提现')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .withdraw{
    width: 812px;
    .detail{
      margin-top: 20px;
      .borderBox();
      padding: 0;
      width: 100%;
    }
  }
</style>
