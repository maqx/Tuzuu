/* * crate by mqx on 2018-01-31 */
<template>
  <div class="page">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="result"
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    components: {

    },
    props:{
      total:0,
      currentPage:0,
      handleCurrentChange:null
    },
    data: function () {
      return {
        myResult: this.currentPage//data中新增字段
      };
    },
    computed: {
      result() {
          return  this.myResult = this.currentPage
      }
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .page{

  }
</style>
