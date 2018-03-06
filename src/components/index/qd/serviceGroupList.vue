<template>
  <div class="service-group-list content">
    <back-btn :title="title"></back-btn>
    <el-row class="top">
      <el-col>带团日期</el-col>
      <el-col :span="8">
        <el-date-picker class="start_time" v-model="date.start_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
        </el-date-picker>
        <span class="to gray-txt1">至</span>
        <el-date-picker class="end_time" v-model="date.end_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="12">
        <el-button @click="searchServiceGroupList" class="green_btn">搜索</el-button>
        <el-button @click="checkoutAll"  class="green_btn">全部导出</el-button>
      </el-col>
    </el-row>
    <div v-loading="loading" class="lists">
      <ul class="list-title">
        <li>带团日期</li>
        <li>团号</li>
        <li>团客人数</li>
        <li>提交评价人数</li>
        <li class="star">平均星级</li>
        <li>评论合集</li>
      </ul>
      <div v-if="lists.total">
        <ul  v-for="item in lists.list" class="list">
          <li class="date">{{item.start_date}}</li>
          <li class="group-id">{{item.title}}</li>
          <li class="tourist-num">{{item.tourist_num}}</li>
          <li class="commit-num">{{item.comment_num}}</li>
          <li class="star">
            <img v-for="i in parseInt(item.comment)" class="all" src="/static/images/StarAll.png" />
            <span v-if="item.comment%parseInt(item.comment)>0">
                <img v-if="item.comment%parseInt(item.comment)>=0.5" class="all none" src="/static/images/StarHalfM.png" />
                <img v-if="item.comment%parseInt(item.comment)<0.5" class="all none" src="/static/images/StarHalfL.png" />
              </span>
            <span v-else>
                <img v-if="item.comment>0.5" class="all none" src="/static/images/StarHalfM.png" />
                <img  v-if="item.comment==0.5" class="all none" src="/static/images/StarHalf.png" />
                <img v-if="item.comment<0.5 && item.comment>0" class="all none" src="/static/images/StarHalfL.png" />
            </span>
            <img v-if="(5-parseInt(item.comment))>=1" v-for="j in  Math.floor(5 - item.comment) " class="all none" src="/static/images/StarNone.png" />
            <span style="color:#10B0C3;font-size: 14px;">{{item.comment.toFixed(1)}}</span>
          </li>
          <router-link to="/qd/groupCommentsList/97/少林寺小分队/张红伟/20170930/2017-09-30/112/49" class="oprater ">详情</router-link>
          <el-button @click="checkOutOne" class="checkout green_btn">导出</el-button>
        </ul>
        <pages :currentPage="currentPage" :total="lists.total"  :handleCurrentChange="handleCurrentChange"></pages>
      </div>
      <div v-else>
        <div class="no-order">
          <div class="pic"></div>
          <h3>暂无数据</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import api from '../../../config/api'
  import {formatDate} from '../../../common/js/date';
  import backBtn from '../public/back.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      backBtn,
      ElCol,
      ElRow,
      Pages
    },
    data () {
      return {
        lists:{},
        currentPage:1,
        loading:false,
        title:'',
        param:{
          page:1,
          perPage:10,
          tzu_id:'',
          qd_id:'',
          start_date_s:'2016-1-01',
          start_date_e:'2018-1-24'
        },
        date:{
          start_time_value:'2016-1-01',
          end_time_value:'',
          pickerOptions: {
            disabledDate(time) {
              let curDate = new Date();
              let preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
              return time.getTime() >preDate|| time.getTime() < new Date(2016, 1, 1);//注意是||不是&&
            }
          }
        },
      }
    },
    methods: {
      // page
      handleCurrentChange(val) {
        this.loading=true
        this.param.page = val
        this.currentPage=val
        this.getGroupList(this.param)
      },
      // 搜索
      searchServiceGroupList(){
        this.loading=true
        this.param.page =1
        this.currentPage=1
        this.param.start_date_s=formatDate(new Date(this.date.start_time_value),'yyyy-M-dd')
        this.param.start_date_e=formatDate(new Date(this.date.end_time_value),'yyyy-M-dd')
        this.getServiceGroupList(this.param)
      },
      // 获取评价管理列表
      getServiceGroupList(param){
        api.getServiceGroupList(param)
          .then(res=>{
            if(res.status){
              this.lists=res.data
              this.loading=false
            }
          })
      },
      //全部导出
      checkoutAll(){

      },
      // 导出
      checkOutOne(){

      }
    },
    created: function () {
      this.$store.commit('CHANGE_TITLE','渠道')
      this.$store.commit('TAB_ACTIVE',2)
      let curDate = new Date();
      let preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      this.date.end_time_value=formatDate(preDate,'yyyy-M-dd')
      this.param.start_date_e=this.date.end_time_value
      this.param.tzu_id=this.$route.params.tzu_id
      this.param.qd_id=this.$route.params.qd_id
      this.title=this.$route.params.qd_name+'-'+this.$route.params.tzu_name
      this.getServiceGroupList(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .service-group-list{
    .top{
      text-align: left;
      margin-top: 20px;
      width: 100%;
      .borderBox();
      .start_time,.end_time{
        width: 130px;
      }
    }
    .lists{
      position: relative;
      min-height: 500px;
      margin-top: 20px;
      text-align: left;
      width: 100%;
      .borderBox();
      padding: 0;
      li{
        display: inline-block;
        width: 130px;
        text-align: center;
        font-size: 14px;
      }
      .star{
        width: 200px;
      }
      .oprater{
        width: 130px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        color: @color_green;
      }
      .list{
        border-bottom: @boxBorder;
        li{
            color: #666;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
          }
      }
    }
  }
  .no-order h3{
    text-align: center;
  }
</style>
