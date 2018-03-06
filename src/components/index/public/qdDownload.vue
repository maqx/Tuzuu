/* * crate by mqx on 2017-05-10 */
<template>
  <div class="qd-list">
    <h4>渠道</h4>
    <el-select class="qd" v-model="qd.qd_value" placeholder="全部渠道">
      <el-input class="search-input" :model="result"
        placeholder="搜索"
        @change="getQdList">
        <i slot="prefix" class=" el-input__icon el-icon-search"></i>
      </el-input>
      <!--<el-autocomplete-->
        <!--v-model="result"-->
        <!--:fetch-suggestions="querySearchAsync"-->
        <!--placeholder="搜索"-->
        <!--@select="getQdList">-->
        <!--<i slot="prefix" class=" el-input__icon el-icon-search"></i>-->
      <!--</el-autocomplete>-->
      <el-option label="全部渠道" value=" ">
      </el-option>
      <el-option v-for="i in qd.qdlist" :key="i.qd_id" :label="i.qd_name" :value="i.qd_id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:{
      qd:{},
      searchQdName:'',
      getQdList:''
    },
    data(){
        return{
          value:''
        }
    },
    computed: {
      result() {
        return   this.value = this.searchQdName
      }
    },
    methods:{
      querySearchAsync(queryString, cb){

      }
    },
    created(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .qd-list{
    h4{
      margin-bottom: 6px;
    }
  }
  .el-input{
    margin: 10px;
    width: 90% !important;
  }
</style>
