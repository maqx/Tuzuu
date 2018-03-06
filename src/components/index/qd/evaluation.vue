<template>
  <div class="evaluation-list content">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right">
      <h2>评价管理</h2>
      <el-row class="right-top">
        <el-col :span="8">
          <h4>渠道</h4>
          <el-select class="qd" v-model="qd.qd_value" placeholder="全部渠道">
            <el-input  class="search" placeholder="搜索" icon="search" > </el-input>
            <el-option label="全部渠道" value=" ">
            </el-option>
            <el-option v-for="i in qd.qdlist" :key="i.qd_id" :label="i.qd_name" :value="i.qd_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <h4>服务者姓名</h4>
          <el-select class="qd" v-model="serverName.server_value" placeholder="全部服务者">
            <el-input  class="search" placeholder="搜索" icon="search" > </el-input>
            <el-option label="全部服务者" value=" ">
            </el-option>
            <el-option v-for="i in serverName.serverList" :key="i.tzu_id" :label="i.tzu_name" :value="i.tzu_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col class="btns" :span="8">
          <el-button @click="searchEvaluationList" class="green_btn">搜索</el-button>
          <el-button @click="getAllEvaluationList" class="green_btn">全部渠道</el-button>
          <el-button @click="searchEvaluationList" class="green_btn">全部导出</el-button>
        </el-col>
      </el-row>
      <div v-loading="loading" class="lists">
        <ul class="list-title">
          <li class="qd-name">渠道名称</li>
          <li class="server">服务者</li>
          <li class="total">累计带团</li>
          <li class="group-num">团客人数</li>
          <li class="submit">提交评价</li>
          <li class="star">平均星级</li>
          <li class="operate">操作</li>
        </ul>
        <div v-if="lists.total">
          <ul  v-for="item in lists.list" class="list">
            <li class="qd-name">{{item.qd_name}}</li>
            <li class="server">{{item.tzu_name}}</li>
            <li class="total">{{item.tourist_group_num}}</li>
            <li class="group-num">{{item.tourist_num}}</li>
            <li class="submit">{{item.comment_num}}</li>
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
            <router-link to="/qd/serviceGroupLlist/49/112/少林寺小分队/张红伟" class="oprater ">详情</router-link>
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
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import api from '../../../config/api'
  import leftTab from '../public/leftTab.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      ElCol,
      ElRow,
      leftTab,
      Pages
    },
    data () {
      return {
        lists:{},
        currentPage:1,
        loading:false,
        qd:{
          qdlist:[],
          qd_value:' ',
        },
        serverName:{
          serverList:[],
          server_value:' ',
        },
        leftTab:{
          title:'渠道',
          list:[
            {title:'全部渠道',id:1,to:'/qd',active:''},
            {title:'评价管理',id:2,to:'/qd/evaluation',active:'active'}
          ]
        },
        param:{
          page:1,
          perPage:10,
          qd_id:'',
          tzu_id:'',
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.loading=true
        this.param.page = val
        this.currentPage=val
        this.getGroupList(this.param)
      },
      // 搜索
      searchEvaluationList(){
        this.param.page = 1
        this.currentPage=1
        this.loading=true
        if(this.serverName.server_value===' '){
          this.param.tzu_id=''
        }else {
          this.param.tzu_id=this.serverName.server_value
        }
        if(this.qd.qd_value===' '){
          this.param.qd_id=''
        }else{
          this.param.qd_id = this.qd.qd_value
        }
        this.getGroupList(this.param)
      },
      // 全部评价管理
      getAllEvaluationList(){
        // 初始化数据
        Object.assign(this.$data, this.$options.data())
        this.loading=true
        this.GetSearchTzuList()
        this.getQdList()
        this.getGroupList(this.param)
      },
      // 获取评价管理列表
      getGroupList(param){
        api.getGroupList(param)
          .then(res=>{
            if(res.status){
              this.lists=res.data
              this.loading=false
            }
          })
      },
      // 获取服务者姓名
      GetSearchTzuList(){
        api.searchTzuList()
          .then(res=>{
            if(res.status){
              this.serverName.serverList=res.data
            }
          })
      },
      // 获取渠道列表
      getQdList(){
        api.getQdList()
          .then(res=>{
            if(res.status){
              this.qd.qdlist=res.data
            }else{

            }
          })
      },
      //全部导出
      checkoutAll(){

      }
    },
    created: function () {
      this.$store.commit('TAB_ACTIVE',2)
      this.$store.commit('CHANGE_TITLE','渠道')
      this.loading=true
      this.GetSearchTzuList()
      this.getQdList()
      this.getGroupList(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .evaluation-list{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right{
      float: right;
      margin-left: 10px;
      width: @rightWidth;
      .right-top{
        width: 100%;
        text-align: left;
        .borderBox();
        h4{
          color: #292626;
          font-size: 16px;
          line-height: 30px;
        }
        .btns{
          margin-top: 30px;
        }
      }
      .lists{
        margin-top: 20px;
        min-height: 600px;
        position: relative;
        width: 100%;
       .borderBox();
        padding:0;
        li{
            width: 100px;
            display: inline-block;
        }
        .qd-name{
          width: 144px;
        }
        .star{
          width: 150px;
        }
        .list{
          border-bottom: @boxBorder;
          li{
            color: #666;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
          }
          .oprater{
            width: 100px;
            font-size: 14px;
            color: @color_green;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
