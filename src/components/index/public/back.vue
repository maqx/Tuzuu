/* * crate by mqx on 2017-05-10 */
<template>
  <div class="back-btn">
    <el-row >
      <el-col :span="18">
        <h2>{{title}}</h2>
      </el-col>
      <el-col :span="6">
        <slot ></slot>
        <el-button @click="backFn" class="backBtn green_btn font-size-22" >返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:{
      title:null
    },
    methods:{
      backFn(){
          this.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .back-btn{
    border-bottom: 2px solid #10B0C3;
    .backBtn{
      height: 40px;
      width: 140px;
      float: right;
      margin-bottom: 20px;
    }
  }
</style>
