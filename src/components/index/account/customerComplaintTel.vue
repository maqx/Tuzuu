<template>
  <div class="customer-complaint">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right-content">
      <account-haeder></account-haeder>
      <div class="detail">
        <h4><img src="/static/images/tel.png"> <span> 客诉电话</span></h4>
        <el-input v-if="!data.complaint_mobile || isChange" class="tel"
          v-model="input" @change="InputChange"
          clearable>
        </el-input>
        <p class="tel" v-else>
          {{data.complaint_mobile}}
        </p>
        <div class="btns">
          <el-button @click="submitMobileFn" v-if="!data.complaint_mobile || isChange" class="green_btn">提交</el-button>
          <el-button @click="changeMobileFn" v-else class="green_btn">修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../config/api'
  import leftTab from '../public/leftTab.vue'
  import accountInfo from './public/accountInfo.vue'
  import accountHaeder from './public/accountHeader.vue'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      ElInput,
      leftTab,accountHaeder,accountInfo},
    data () {
      return {
        leftTab:{
          title:'财务',
          list:[
            {title:'个人账户',id:1,to:'/account',active:'active',childLists:[
              {title:'冻结金额流水',id:'a',to:'/account/amountFrozen',active:''},
              {title:'可提现金额流水',id:'b',to:'/account/availableBalance',active:''},
              {title:'提现记录',id:'c',to:'/account/withdrawalRecord',active:''},
              {title:'客诉电话',id:'d',to:'/account',active:'childActive'}
            ]},
            {title:'结算明细',id:2,to:'/account/billingDetails',active:''},
            {title:'下载中心',id:3,to:'/accoun/downloadCentert',active:''}
          ]
        },
        input:'',
        data:{},
        isChange:false
      }
    },
    methods: {
      //获取客诉信息
      getFwsInfo(){
        api.getFwsInfo()
          .then(res=>{
            if(res.status){
              this.data=res.data
            }
          })
      },
      //修改客诉电话
      changeMobileFn(){
          this.isChange=true
      },
      InputChange(){
        this.input = this.input.replace(/[^0-9-/\s]/g, '')
      },
      // 提交客诉电话
      submitMobileFn(){
        let param={
            mobile:this.input
        }
        if(this.input===''){
          this.$message({
            message: '请输入客诉电话后再提交',
          });
          return
        }
        api.editComplaintCall(param)
          .then(res=>{
              if(!res.status){
                this.$message({
                  message: res.errmsg,
                });
                return
              }
            if(res.data){
              this.$message({
                message: '提交成功',
                type: 'success'
              });

             setTimeout(() => {
               this.isChange=false
              }, 1000);
            }else{
              this.$message({
                message:'提交失败',
              });
            }
          })
      }
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-财务')
      this.getFwsInfo()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .customer-complaint{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right-content{
      float: right;
      margin-left: 10px;
      width: @rightWidth;
      .detail{
        margin-top: 20px;
        width: 99.8%;
        .borderBox();
        text-align: left;
        padding: 20px 0;
        h4{
          padding: 20px 30px;
          font-size: 18px;
          border-bottom: 2px solid #DADADD;
          text-align: left;
        }
        .tel{
          margin: 30px;
          width: 300px;
        }
        .btns{
          margin-left: 30px;
          button{
            height: 36px;
            min-width: 70px;
          }
        }
      }
    }
  }
</style>
