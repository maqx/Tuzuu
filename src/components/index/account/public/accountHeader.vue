/* * crate by mqx on 2017-05-10 */
<template>
  <div class="account-header">
    <div class="detail">
      <el-col :span="4">
        <img src="../../../../../static/images/logo1.png"/>
      </el-col>
      <el-col :span="12">
        <h2>陆雅颖</h2>
        <h2>17612150914</h2>
      </el-col>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    props:{

    },
    computed:{
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../../common/less/mixins.less");
  .account-header{
    text-align: left;
    width: 99.8%;
    .borderBox();
     padding: 14px 0;
    .detail{
      margin-left: 30px;
    }
    img{
      width: 86px;
      height: 86px;
      border-radius: 50%;
    }
  }
</style>
