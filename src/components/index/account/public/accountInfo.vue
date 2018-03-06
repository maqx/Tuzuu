/* * crate by mqx on 2017-05-10 */
<template>
  <div class="account-info">
    <p class="user">
      <span class="user-icon"></span>
      <span>账户</span>
    </p>
    <el-row class="amount ">
      <el-col :span="8">
        <p>账户可提现金额<span class="gray-txt2 font-size-12">（元）</span></p>
        <p class="txt font-size-24 red-txt">41</p>
      </el-col>
      <el-col :span="8">
        <p>账户冻结金额<span class="gray-txt2 font-size-12">（元）</span></p>
        <p class="txt font-size-24 gray-txt1">22</p>
      </el-col>
      <el-col :span="8">
        <p>账户可提现金额<span class="gray-txt2 font-size-12">（元）</span></p>
        <p class="txt font-size-24 gray-txt1">0</p>
      </el-col>
    </el-row>
    <el-button @click="goWithdrawFn"  class="green_btn withdraw-btn">提现</el-button>
  </div>
</template>
<script>
  import api from '../../../../config/api'
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton
    },
    props:{

    },
    data(){
        return{
            accountInfo:null
        }
    },
    computed:{

    },
    methods:{
      goWithdrawFn(){
        this.$router.push('/account/withdraw')
      }
    },
    created: function () {
      api.getAccountInfoApi()
        .then(res=>{
          if(res.status){
            this.accountInfo=res.data
          }
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../../common/less/mixins.less");
  .account-info{
    margin-top:20px;
    background-color: @color_white;
    border: @boxBorder;
    text-align: left;
    padding: 20px 52px 52px;
    .user{
      border-bottom: 1px solid @gray_txt;
      span{
        line-height: 40px;
      }
      .user-icon{
        float: left;
        background: url(../../../../../static/images/bg.png);
        background-position: -263px -397px;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
    .amount{
      margin-top: 20px;
      margin-bottom: 40px;
      .txt{
        font-weight: 600;
      }
    }
    .withdraw-btn{
      height: 35px;
      width: 70px;
    }
  }
</style>
