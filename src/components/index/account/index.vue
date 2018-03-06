<template>
  <div class="account">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right-content">
      <account-haeder></account-haeder>
      <account-info></account-info>
    </div>
  </div>
</template>

<script>
  import leftTab from '../public/leftTab.vue'
  import accountInfo from './public/accountInfo.vue'
  import accountHaeder from './public/accountHeader.vue'
  export default {
    name: 'order',
    components:{leftTab,accountHaeder,accountInfo},
    data () {
      return {
        leftTab:{
          title:'财务',
          list:[
            {title:'个人账户',id:1,to:'/account',active:'active',childLists:[
              {title:'冻结金额流水',id:'a',to:'/account/amountFrozen',active:''},
              {title:'可提现金额流水',id:'b',to:'/account/availableBalance',active:''},
              {title:'提现记录',id:'c',to:'/account/withdrawalRecord',active:''},
              {title:'客诉电话',id:'d',to:'/account/customerComplaintTel',active:''}
            ]},
            {title:'结算明细',id:2,to:'/account/billingDetails',active:''},
            {title:'下载中心',id:3,to:'/account/downloadCenter',active:''}
          ]
        },

      }
    },
    methods: {
    },
    created(){
      this.$store.commit('CHANGE_TITLE','服务商-财务')
      this.$store.commit('TAB_ACTIVE',3)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .account{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right-content{
      float: right;
      margin-left: 10px;
      width: @rightWidth;
    }
  }
</style>
