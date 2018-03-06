<template>
  <div class="order-list">
    <back-btn title="订单列表"></back-btn>
    <div class="detail">
      <el-row class="top">
        <el-col class="date">日期：2017-08-10</el-col>
        <el-col :span="6">已完成订单总计：<span class="green-txt">0</span></el-col>
        <el-col :span="7">渠道分成金额总计：<span class="green-txt">￥0</span></el-col>
        <el-col :span="7">渠道分成金额总计：<span class="green-txt">￥0</span></el-col>
        <el-col class="btn" :span="4">
          <el-button class="green_btn">全部导出</el-button>
        </el-col>
      </el-row>
      <el-row class="lists">
        <ul class="list-title">
          <li class="order-id">订单号</li>
          <li>渠道名</li>
          <li>渠道服务者</li>
          <li>订单金额</li>
          <li>渠道分成金额</li>
          <li>服务商分成金额</li>
          <li>订单状态</li>
          <li class="date">下单时间</li>
          <li class="cope">操作</li>
        </ul>
        <div class="list"  v-if="data.total">
          <ul class="item"  v-for="item in data.list">
            <li class="order-id">{{item.order_num}}</li>
            <li >{{item.qd_name}}</li>
            <li >{{item.tzu_name}}</li>
            <li >￥{{item.pay_money}}</li>
            <li>￥{{item.fc_qd}}</li>
            <li >￥{{item.fc_fws}}</li>
            <li >{{item.pay_status}}</li>
            <li class="date">{{item.create_dt}}</li>
            <li class="cope">
              <router-link  :to="{ path:'/order/detail/209833'}"  class="record-id green-txt font-size-14">详情</router-link>
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
      </el-row>
    </div>
  </div>
</template>

<script>
  import Pages from '../public/page.vue'
  import backBtn from '../public/back.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      ElCol,
      ElRow,
      backBtn,
      Pages
    },
    data () {
      return {
        currentPage:1,
        data:{
          total_order_num:0,
          total_qd_fc:0,
          total_fws_fc:1,
          total:4,
          list:[
            {
              order_num:'1708142317550068-1',
              qd_name:'风花雪月-邓捷',
              tzu_name:'邓捷',
              pay_money:'11552',
              fc_qd:'0',
              fc_fws:'0',
              pay_status:'已完成',
              create_dt:'2017-08-14 23:17'
            },
            {
              order_num:'1708142317550068-1',
              qd_name:'风花雪月-邓捷',
              tzu_name:'邓捷',
              pay_money:'11552',
              fc_qd:'0',
              fc_fws:'0',
              pay_status:'已完成',
              create_dt:'2017-08-14 23:17'
            }
          ]
        },
        param:{}
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage=val
        this.loading=true
        this.param.page = val
        //this.getfcList(this.param)
      },
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-财务')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .order-list{
    .detail{
      margin-top: 20px;
      .top,.lists{
          .borderBox();
        padding: 0;
          width: 100%;
      }
      .top{
        text-align: left;
        color:@title_txt2;
        padding: 20px;
        .date{
          margin-bottom: 10px;
        }
        .btn{
          text-align: right;
        }
      }
      .lists{
        min-height: 500px;
        margin-top: 20px;
        li{
          display: inline-block;
          width: 100px;
        }
        .order-id{
          width: 160px;
        }
        .date{
          width: 140px;
        }
        .cope{
          width: 50px;
        }
        .list{
          line-height: 38px;
          .item{
            border-bottom: @boxBorder;
          }
          li{
              font-size: 14px;
              color: #666;
          }
        }
      }
    }
  }
</style>
