<template>
  <div class="order">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right">
      <h2>全部渠道</h2>
      <el-row class="right-header">
        <el-col  :span="7" class="status">
          <h4>订单状态</h4>
          <el-select class="status" v-model="qdStatus.status_value" placeholder="全部状态">
            <el-option v-for="item in qdStatus.status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col  :span="7" class="qdstatus">
          <qd-list :qd="qd" :getQdList="getQdList"  :searchQdName="searchQdName"></qd-list>
        </el-col>
        <el-col class="btns" :span="10">
          <el-button @click="searchQdList"  type="primary">搜索</el-button>
          <el-button @click="getAllQd" type="primary">全部订单</el-button>
          <el-button disabled type="info">导出</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab lists" type="border-card">
        <el-tab-pane v-loading="loading" class="list" :key="item.value" v-for="item in qdStatus.status" :label="item.label" :name="item.value">
          <ul class="list-title">
            <li class="q-name">渠道名</li>
            <li class="sv-name">渠道服务者</li>
            <li class="total">累计销售额(元)</li>
            <li class="available">可用金额（元）</li>
            <li class="status">状态</li>
            <li class="oprater">操作</li>
          </ul>
          <div v-if="qdData.total">
            <ul class="item"  v-for="item in qdData.list">
              <li class="q-name">{{item.qd_name}}</li>
              <li class="sv-name">{{item.qd_server}}</li>
              <li class="total">{{item.total_sales}}</li>
              <li class="available">{{item.account_usable}}</li>
              <li v-if="item.status" class="status">启用</li>
              <li v-else class="status">停用</li>
              <router-link to="qd/order/list/93/29" class="oprater ">订单</router-link>
              <!--<router-link :to="{ path:'qd/detail/'+item.id}"  class="oprater ">详情</router-link>-->
              <router-link to="qd/detail/60" class="oprater ">详情</router-link>
            </ul>
            <pages :currentPage="currentPage" :total="qdData.total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></pages>
          </div>
          <div v-else>
            <div class="no-order">
              <div class="pic"></div>
              <h3>暂无数据</h3>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import qdList from '../public/qdDownload.vue'
  import api from '../../../config/api'
  import leftTab from '../public/leftTab.vue'
  export default {
    name: 'order',
    components:{
      leftTab,Pages,qdList
    },
    data () {
      return {
        searchQdName:'',
        activeName:' ',
        currentPage:1,
        loading:false,
        leftTab:{
          title:'渠道',
          list:[
            {title:'全部渠道',id:1,to:'/qd',active:'active'},
            {title:'评价管理',id:2,to:'/qd/evaluation',active:''}
          ]
        },
        //渠道状态
        qdStatus:{
          status: [{
            value: ' ',
            label: '全部状态'
          }, {
            value: '0',
            label: '停用中'
          }, {
            value: '1',
            label: '启用中'
          }],
          status_value:' '
        },
        qd:{
          qdlist:[],
          qd_value:' ',
        },
        qdData:{},
        param:{
          page:1,
          length:10,
          status:'',
          qd_id:'',
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        this.loading=true
        this.param.page = 1
        this.currentPage=1
        if(tab.$options.propsData.name === ' '){
          this.param.status=''
        }else{
          this.param.status = tab.$options.propsData.name
        }
        this.qdStatus.status_value =this.activeName
        this.getQdInfoList(this.param)
      },
      handleCurrentChange(val) {
        this.loading=true
        this.param.page = val
        this.currentPage=val
        this.getQdInfoList(this.param)
      },
      handleSizeChange(){},
      //获取渠道列表
      getQdInfoList(param){
        api.getQdInfoList(param)
          .then(res =>{
            if (res.status===1) {
              this.qdData = res.data;
              this.loading=false
            }
          })
      },
      // 获取渠道列表
      getQdList(){
        let param ={
          key:this.searchQdName,
          length:30
        }
        api.getQdList(param)
          .then(res=>{
            if(res.status){
              this.qd.qdlist=res.data
            }
          })
      },
      // 搜索
      searchQdList(){
        this.currentPage=1
        this.loading=true
        this.param.page = 1
        this.activeName =this.qdStatus.status_value
        if(this.qdStatus.status_value===' '){
          this.param.order_status=''
        }else {
          this.param.status=this.qdStatus.status_value
        }
        if(this.qd.qd_value===' '){
          this.param.qd_id=''
        }else{
          this.param.qd_id = this.qd.qd_value
        }
          this.getQdInfoList(this.param)
      },
      // 全部订单
      getAllQd(){
        // 初始化数据
        Object.assign(this.$data, this.$options.data())
        this.loading=true
        this.getQdList()
        this.getQdInfoList(this.param)
      }
    },
    created: function () {
      this.$store.commit('TAB_ACTIVE',2)
      this.$store.commit('CHANGE_TITLE','渠道')
      this.loading=true
      this.getQdInfoList(this.param)
      this.getQdList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .order{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right{
      float: right;
      margin-left: 10px;
      width: @rightWidth;
      .right-header{
        padding: 14px;
        background-color: @color_white;
        border: @boxBorder;
        text-align: left;
        h4{
          margin-bottom: 6px ;
        }
        .qdstatus{
          padding-left: 20px;
        }
        .btns{
          padding-left: 20px;
          margin-top: 28px;
          height:100%;
        }
      }
      .lists{
        text-align: left;
        margin-top: 15px;
        .radius();
        width: 100%;
        li{
          display: inline-block;
          text-align: center;
          width: 120px;
        }
        .list{
          min-height: 540px;
          text-align: center;
        }
        .item{
          border-bottom: @boxBorder;
          li{
              font-size: 14px;
              line-height: 40px;
              color: #666;
          }
          .oprater{
            color:@color_green;
            display: inline-block;
            text-align: center;
            font-size: 14px;
          }
        }
        .q-name{
          width: 160px;
        }
        .oprater{
          width: 60px;
        }
      }
    }
  }
</style>
