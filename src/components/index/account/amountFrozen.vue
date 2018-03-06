<template>
  <div class="account-frozen">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right-content">
      <account-haeder></account-haeder>
      <el-row class="search">
        <el-col :span="8">
          <span>操作类型：</span>
          <el-select class="cope" v-model="cope_status.value" placeholder="全部">
            <el-option v-for="i in cope_status.list" :key="i.qd_id" :label="i.name" :value="i.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <el-date-picker class="start_time" v-model="date.start_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
          </el-date-picker>
          <span class="to gray-txt1">至</span>
          <el-date-picker class="end_time" v-model="date.end_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span="2"><el-button @click="searchFn" class="green_btn">搜索</el-button></el-col>
      </el-row>
      <div class="detail">
        <div class="list-top">
          <el-col :span="21">
            <span><i class=" green-txt font-size-22 iconfont">&#xe6a6; </i> 总计（元） </span> <span class="num red-txt"> {{data.account}}</span>
          </el-col>
          <el-col v-if="data.total" :span="3"><el-button class="green_btn">全部导出</el-button></el-col>
          <el-col  v-if="!data.total"  :span="3"><el-button class="gray_btn">全部导出</el-button></el-col>
        </div>
        <div v-loading="loading" class="lists">
          <ul class="list-title">
            <li class="time">时间</li>
            <li class="record-id">流水号</li>
            <li>金额</li>
            <li>类型</li>
          </ul>
          <div class="list"  v-if="data.total">
            <ul class="item"  v-for="item in data.list">
              <li class="time">{{item.time}}</li>
              <li class="record-id" v-if="!item.order_detail_id">{{item.record_id}}</li>
              <router-link v-else :to="{ path:'/order/detail/'+item.order_detail_id}"  class="record-id green-txt font-size-14">{{item.record_id}}</router-link>
              <!--<router-link v-else to="order/detail/id=108342&start_time=2016-1-01&end_time=2018-1-29&type=0&perPage=1"  class="record-id green-txt">{{item.record_id}}</router-link>-->
              <li>{{item.money}}</li>
              <li>{{item.type}}</li>
            </ul>
            <pages :currentPage="currentPage" :total="data.total"  :handleCurrentChange="handleCurrentChange"></pages>
          </div>
          <div v-else>
            <div class="no-order">
              <div class="pic"></div>
              <h3>暂无数据</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import {formatDate} from '../../../common/js/date';
  import api from '../../../config/api'
  import leftTab from '../public/leftTab.vue'
  import accountHaeder from './public/accountHeader.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      ElCol,
      ElRow,
      leftTab,
      accountHaeder,Pages},
    data () {
      return {
        data:{},
        loading:false,
        currentPage:1,
        leftTab:{
          title:'财务',
          list:[
            {title:'个人账户',id:1,to:'/account',active:'active',childLists:[
              {title:'冻结金额流水',childId:1, id:'a',to:'/account/amountFrozen',active:'childActive'},
              {title:'可提现金额流水',id:'b',to:'/account/availableBalance',active:''},
              {title:'提现记录',id:'c',to:'/account/withdrawalRecord',active:''},
              {title:'客诉电话',id:'d',to:'/account/customerComplaintTel',active:''}
            ]},
            {title:'结算明细',id:2,to:'/account/billingDetails',active:''},
            {title:'下载中心',id:3,to:'/account/downloadCenter',active:''}
          ],
        },
        date:{
          start_time_value:'2016-1-01',
          end_time_value:'',
          pickerOptions: {
            disabledDate(time) {
              let preDate = new Date();
              return time.getTime() >preDate|| time.getTime() < new Date(2015, 12, 1);//注意是||不是&&
            }
          }
        },
        cope_status:{
          list:[
            {
              name:'全部',
              id:0,
            },
            {
              name:'订单收入',
              id:1,
            },
            {
              name:'流入可提现金额',
              id:2,
            },
            {
              name:'订单退款',
              id:3,
            },
            {
              name:'后台操作',
              id:4,
            },
          ],
          value:'全部'
        },
        param:{
          page:1,
          start_time:'2016-1-01',
          end_time:'2018-1-29',
          type:0
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage=val
        this.loading=true
        this.param.page = val
        this.getFreezeFlowListApi(this.param)
      },
      getFreezeFlowListApi(param){
          api.getFreezeFlowListApi(param)
            .then(res=>{
              if(res.status){
                this.data = res.data
                this.loading=false
              }
            })
      },
      searchFn(){
        this.param.page=1
        this.currentPage=1
        this.loading=true
        this.param.start_time=formatDate(new Date(this.date.start_time_value),'yyyy-M-dd')
        this.param.end_time=formatDate(new Date(this.date.end_time_value),'yyyy-M-dd')
        if(this.param.start_time>this.param.end_time){
          this.$confirm('请选择正确的搜索日期', {
            confirmButtonText: '确定',
            showCancelButton:false,
            center: true
          }).then(() => {

          }).catch(() => {

          });
            return
        }
        this.param.type=this.cope_status.value
        this.getFreezeFlowListApi(this.param)
      }
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-财务')
      let curDate = new Date();
      this.date.end_time_value=formatDate(curDate,'yyyy-M-dd')
      this.date.start_time_value=formatDate(curDate,'yyyy-M-dd')
      this.param.start_time=this.date.start_time_value
      this.param.end_time=this.date.end_time_value
      this.getFreezeFlowListApi(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .el-message-box__btns button{
    width: 100% !important;
    margin: 0 !important;
  }
  .account-frozen{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right-content{
      margin-right: 2px;
      float: right;
      width: @rightWidth;
      .search{
        margin: 20px 0;
        .cope{
          width: 160px;
        }
        .start_time,.end_time{
          width: 130px;
        }
      }
      .detail{
        width: @rightWidth;
        .borderBox();
          padding: 0;
        .list-top{
          text-align: left;
          height: 56px;
          padding: 0 20px;
          line-height: 56px;
        }
        .lists{
          position: relative;
          min-height: 520px;
          li{
            display: inline-block;
            width: 180px;
          }
          .list{
            min-height: 400px;
            .item{
              border-bottom: @boxBorder;
            }
            li{
                font-size: 14px;
                line-height: 40px;
                color: #666;
            }
          }
          .time{
            width: 210px;
          }
          .record-id{
            width: 210px;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
