<template>
  <div class="account-frozen">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right-content">
      <account-haeder></account-haeder>
      <el-row class="search">
        <el-col :span="5">
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
            <span>已完成订单：<span class="green-txt"> {{data.total_order_num}} </span> </span>
            <span>渠道分成金额总计：<span class="green-txt"> ￥{{data.total_qd_fc}} </span> </span>
            <span>服务商分成金额总计：<span class="green-txt"> ￥{{data.total_fws_fc}} </span></span>
          </el-col>
          <el-col v-if="data.total" :span="3"><el-button class="green_btn">全部导出</el-button></el-col>
          <el-col  v-if="!data.total"  :span="3"><el-button class="gray_btn">全部导出</el-button></el-col>
        </div>
        <div v-loading="loading" class="lists">
          <ul class="list-title">
            <li class="date">日期</li>
            <li >当日已完成订单</li>
            <li>渠道分成金额</li>
            <li>服务商分成金额</li>
            <li>操作</li>
            <li></li>
          </ul>
          <div class="list"  v-if="data.total">
            <ul class="item"  v-for="item in data.list">
              <li class="date">{{item.date}}</li>
              <li >{{item.num}}</li>
              <li >{{item.qd_fc}}</li>
              <li>{{item.fws_fc}}</li>
              <li>
                <router-link  :to="{ path:'/account/billingOrderList/'+item.id+'/0/0/0/0/0'}"  class="record-id green-txt font-size-14">查看详情</router-link>
              </li>
              <li>
                <el-button class="green_btn">导出</el-button>
              </li>
            </ul>
            <pages :currentPage="currentPage" :total="data.total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></pages>
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
      accountHaeder,
      Pages},
    data () {
      return {
        data:{},
        loading:false,
        currentPage:1,
        leftTab:{
          title:'财务',
          list:[
            {title:'个人账户',id:1,to:'/account',active:''},
            {title:'结算明细',id:2,to:'/account/billingDetails',active:'active'},
            {title:'下载中心',id:3,to:'/account/downloadCenter',active:''}
          ],
        },
        date:{
          start_time_value:'2016-1-01',
          end_time_value:'',
          pickerOptions: {
            disabledDate(time) {
              let curDate = new Date();
              let preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
              return time.getTime() >preDate|| time.getTime() < new Date(2015, 12, 1);//注意是||不是&&
            }
          }
        },
        cope_status:{
          list:[
            {
              name:'完成日期',
              id:0,
            }
          ],
          value:0
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
        this.getfcList(this.param)
      },
      handleSizeChange(val){

      },
      getfcList(param){
        api.getfcList(param)
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
        this.getfcList(this.param)
      }
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-财务')
      let curDate = new Date();
      let preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      this.date.end_time_value=formatDate(preDate,'yyyy-M-dd')
      this.date.start_time_value=formatDate(preDate,'yyyy-M-dd')
      this.param.start_time=this.date.start_time_value
      this.param.end_time=this.date.end_time_value
      this.getfcList(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
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
          min-height: 513px;
          li{
              display: inline-block;
              width: 130px;
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
      }
    }
  }
  }
</style>
