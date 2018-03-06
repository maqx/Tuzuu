<template>
  <div class="order">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right">
      <h2>全部订单</h2>
      <el-row  class="right-header">
        <el-col  :span="12" class="order-status">
          <h4>订单状态</h4>
          <el-select class="status" v-model="orderStatus.status_value" placeholder="全部状态">
            <el-option v-for="item in orderStatus.status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col  :span="12" class="qd-status">
          <h4>渠道</h4>
          <el-select class="qd" v-model="qd.qd_value" placeholder="全部渠道">
            <el-input  class="search" placeholder="搜索" icon="search" > </el-input>
            <el-option label="全部渠道" value=" ">
            </el-option>
            <el-option v-for="i in qd.qdlist" :key="i.qd_id" :label="i.qd_name" :value="i.qd_id">
            </el-option>
          </el-select>
        </el-col>
        <div>
          <h4>时间</h4>
          <el-row>
            <el-col :span="9">
              <el-date-picker class="start_time" v-model="date.start_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
              </el-date-picker>
              <span class="to gray-txt1">至</span>
              <el-date-picker class="end_time" v-model="date.end_time_value" type="date" placeholder="选择日期" :picker-options="date.pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="15">
              <el-dropdown class="qk-choise">
                <el-button type="primary">
                  快速选择
                </el-button>
                <el-dropdown-menu  slot="dropdown">
                  <el-dropdown-item>今天</el-dropdown-item>
                  <el-dropdown-item>昨天</el-dropdown-item>
                  <el-dropdown-item>最近7天</el-dropdown-item>
                  <el-dropdown-item>最近30天</el-dropdown-item>
                  <el-dropdown-item>这个月</el-dropdown-item>
                  <el-dropdown-item>上个月</el-dropdown-item>
                  <el-dropdown-item>全部时间</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-select class="select-type"  v-model="select.choiseType_vaule" placeholder="订单号">
                <el-option v-for="i in select.choiseType" :key="i.value" :label="i.label" :value="i.value">
                </el-option>
              </el-select>
              <el-input class="type-value" v-model="typeValue" placeholder="请输入内容"></el-input>
              <el-button @click="searchOrderList" type="primary">搜索</el-button>
              <el-button @click="getAllOrder" type="primary">全部订单</el-button>
              <el-button disabled type="info">导出</el-button>
            </el-col>
          </el-row>
        </div>
      </el-row >
        <el-tabs  v-model="activeName" @tab-click="handleClick" class="tab lists" type="border-card">
          <el-tab-pane  v-loading="loading" class="list" :key="item.value" v-for="item in orderStatus.status" :label="item.label" :name="item.value">
            <ul class="list-title">
              <li class="order-id">订单号</li>
              <li class="q-name">渠道名</li>
              <li class="sv-name">渠道服务者</li>
              <li class="sum">订单金额(元)</li>
              <li class="status">订单状态</li>
              <li class="time">下单时间</li>
              <li class="oprater">操作</li>
            </ul>
            <div  v-if="orderData.total">
              <ul class="item"  v-for="item in orderData.list">
                <li class="order-id">{{item.order_num}}</li>
                <li class="q-name">{{item.qd_name}}</li>
                <li class="sv-name">{{item.qd_server}}</li>
                <li class="sum">{{item.order_price}}</li>
                <li class="status">{{item.order_status_name}}</li>
                <li class="time">{{item.order_time}}</li>
                <!--<router-link :to="{ path:'order/detail/'+item.id}"  class="oprater ">详情</router-link>-->
                <router-link to="order/detail/16926"  class="oprater ">详情</router-link>
              </ul>
              <pages :currentPage="currentPage" :total="orderData.total"  :handleCurrentChange="handleCurrentChange"></pages>

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
  import api from '../../../config/api'
  import leftTab from '../public/leftTab.vue'
  import {formatDate} from '../../../common/js/date';
  export default {
    name: 'order',
    components:{
      leftTab,Pages
    },
    data () {
      return {
        loading:true,
        typeValue:'',
        activeName:' ',
        currentPage: 1,
        date:{
          start_time_value:'2016-1-01',
          end_time_value:'',
          pickerOptions: {
            disabledDate(time) {
              let curDate = new Date();
              return time.getTime() >curDate|| time.getTime() < new Date(2016, 1, 1);//注意是||不是&&
            }
          }
        },

        dateValue: '',
        leftTab:{
            title:'订单',
          list:[{title:'全部订单',id:1,to:'/order',active:'active'}]
        },
        orderStatus:{
          status: [{
            value: ' ',
            label: '全部状态'
          }, {
            value: '0',
            label: '未支付'
          }, {
            value: '1',
            label: '待处理'
          },
            {
              value: '4',
              label: '待分成'
            }, {
              value: '2',
              label: '已完成'
            }, {
              value: '3',
              label: '已退单'
            }],
          status_value:' '
        },

        qd:{
          qdlist:[],
          qd_value:' ',
        },
        orderData:{},
        param:{
          page:1,
          length:10,
          order_status:'',
          create_start:'2016-1-01',
          create_end:'',
          qd_id:'',
          order_num:'',
          qd_server:'',
          is_search:1,
          contact_mobile:''
        },
        orderStatusValue:'',
        select:{
          choiseType:[{
            value: '0',
            label: '订单号'
          }, {
            value: '1',
            label: '服务者'
          }, {
            value: '2',
            label: '联系人手机号'
          }],
          choiseType_vaule:'订单号'
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        this.loading=true
        this.param.page = 1
        this.currentPage=1
        if(tab.$options.propsData.name === ' '){
          this.param.order_status=''
        }else{
          this.param.order_status = tab.$options.propsData.name
        }
        this.orderStatus.status_value =this.activeName
        this.getOrderList(this.param)
      },
      handleCurrentChange(val) {
        this.loading=true
        this.param.page = val
        this.currentPage=val
        this.getOrderList(this.param)
      },
      getOrderList(param){
        api.getOrderList(param)
          .then(res =>{
            if (res.status===1) {
              this.orderData = res.data;
              this.loading=false
            }
          })
      },
      // 获取渠道列表
      getQdList(){
          api.getQdList()
            .then(res=>{
                if(res.status){
                    this.qd.qdlist=res.data
                }
            })
      },
      // 搜索订单
      searchOrderList(){
         this.currentPage=1
          this.param.page = 1
          this.loading=true
          this.activeName =this.orderStatus.status_value
          this.param.create_start=formatDate(new Date(this.date.start_time_value),'yyyy-M-dd')
          this.param.create_end=formatDate(new Date(this.date.end_time_value),'yyyy-M-dd')
          if(this.orderStatus.status_value===' '){
            this.param.order_status=''
          }else {
            this.param.order_status=this.orderStatus.status_value
          }
          if(this.qd.qd_value===' '){
            this.param.qd_id=''
          }else{
            this.param.qd_id = this.qd.qd_value
          }
          this.getOrderList(this.param)
      },
      // 全部订单
      getAllOrder(){
        // 初始化数据
        Object.assign(this.$data, this.$options.data())
        this.loading=true
        this.getQdList()
        this.getOrderList(this.param)
      }
    },
    mounted(){
      let curDate = new Date();
      this.date.end_time_value=formatDate(curDate,'yyyy-M-dd')
      this.param.create_end=this.date.end_time_value
      this.$store.commit('CHANGE_TITLE','订单')
      this.$store.commit('TAB_ACTIVE',1)
      this.getOrderList(this.param)
      this.getQdList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .search{
    margin: 0 10px;
    width: 90%;
  }
  .order{
    overflow: hidden;
    .tab{
      float: left;
    }
    .right{
      float: right;
    }

    h4{
      margin-bottom: 6px ;
    }
    .right{
      margin-left: 10px;
      width: @rightWidth;
      .right-header{
        text-align: left;
        padding: 14px;
        background-color: @color_white;
        border: @boxBorder;
        .radius();
        .select-type{
          width: 90px;
        }
        .start_time,.end_time{
          width: 128px;
        }
        .type-value{
          width: 160px;
          position: relative;
          left: -5px;
          border-left: none !important;
        }
        .qk-choise{
          button{
            width: 90px;
          }
        }
      }
      .lists{
        margin-top: 15px;
        .radius();
        width: 99.6%;
        .list-title{
          background-color: @list_title_color;
          line-height: 30px;
          color: @font-color;
          font-size: 14px;
          border-bottom: @boxBorder;
        }
        li{
          display: inline-block;
          text-align: center;
        }
        .list{
          min-height: 490px;
        }
        .item{
          border-bottom: @boxBorder;
          li{
            font-size: 14px;
            line-height: 40px;
            color: #666;
          }
          .q-name{
            /*.ellipsis();*/
          }
          .oprater{
            color:@color_green;
            display: inline-block;
            text-align: center;
            font-size: 14px;
          }
        }
        .order-id{
          width: 160px;
        }
        .q-name{
          width: 130px;
        }
        .sv-name{
          width:100px;
        }
        .sum{
          width:95px;
        }
        .time{
          width:150px;
        }
        .status{
          width:70px;
        }
        .oprater{
          width:50px;
        }
      }
    }
  }
</style>
