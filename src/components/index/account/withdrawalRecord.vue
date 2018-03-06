<template>
  <div class="withdrawal-record">
     <back-btn title="提现记录"></back-btn>
      <div class="detail">
        <p class="list-top">
          已提现金额：<span class="red-txt">0</span>元
        </p>
        <div v-loading="loading" class="lists">
          <ul class="list-title">
            <li class="time">时间</li>
            <li class="record">账户</li>
            <li>金额</li>
            <li>状态</li>
          </ul>
          <div class="list"  v-if="dataList.total">
            <ul class="item"   v-for="item in dataList.list">
              <li class="time">{{item.create_dt}}</li>
              <li class="record">{{item.account_num}}|{{item.account_name}}</li>
              <li>{{item.money}}</li>
              <li v-if="item.status==1" class="gray-txt1">{{item.process}}</li>
              <li v-if="item.status==10" class="red-txt">{{item.process}}</li>
              <li v-if="item.status==20" class="green-txt">{{item.process}}</li>
              <li v-else >{{item.process}}</li>
            </ul>
            <pages :currentPage="currentPage" :total="data.total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></pages>
          </div>
          <div v-else>
            <div class="no-order">
              <div class="pic"></div>
              <h3>暂无提现记录</h3>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import {formatDate} from '../../../common/js/date';
  import backBtn from '../public/back.vue'
  import api from '../../../config/api'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      backBtn,
      ElButton,
      ElCol,
      ElRow,
      Pages
    },
    data () {
      return {
        loading:false,
        currentPage:1,
        dataList:{},
        param:{
          page:1,
          length:10
        }
      }
    },
    methods: {
      handleSizeChange(){

      },
      handleCurrentChange(val){
        this.currentPage=val
        this.loading=true
        this.param.page = val
      },
      init(param){
          api.getWithdrawRecordApi(param)
            .then(res=>{
                if(res.status){
                    this.dataList=res.data
                }
            })
      }
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-提现记录')
    },
    mounted(){
        this.init(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
    @import url("../../../common/less/mixins.less");
    .withdrawal-record{
      width:820px;
      .detail{
        width: 100%;
        .borderBox();
        margin-top: 20px;
        padding:0;
        .list-top{
          text-align: right;
          padding: 20px 52px;
        }
        .lists{
          min-height: 600px;
          li{
            display: inline-block;
            width: 140px;
          }
          .time,.record{
            width: 250px;
          }
          .list{

          }
        }
      }
    }
</style>
