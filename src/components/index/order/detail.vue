/* * crate by mqx on 2017-05-10 */
<template>
  <div class="order-detail">
    <back-btn title="订单详情" ></back-btn>
    <el-row class="box-one">
      <el-col class="left" :span="16">
        <p class="font-size-14"><span class="gray-txt1">订单号：</span><span >{{data.order_num}}</span></p>
        <p class="font-size-14"><span class="gray-txt1">下单时间：</span><span >{{data.order_time|DateTime}}</span></p>
      </el-col>
      <el-col class="red-txt font-size-24 right" :span="7">
        <span class="iconfont font-size-28 icon-timer "></span>
        <span v-if="data.order_status==0">未支付</span>
        <span v-if="data.order_status==1">待支付</span>
        <span v-if="data.order_status==2">已完成</span>
        <span v-if="data.order_status==3">已退单</span>
        <span v-if="data.order_status==4">未支付</span>
      </el-col>
    </el-row>
    <el-row class="box-two font-size-14">
      <el-col class="left" :span="16">
        <div v-if="data.product" v-for="item in data.product" class="detail">
          <h4>商品详情</h4>
          <p>
            <span class="gray-txt1">商品名称：</span>
            <span>{{item.name}}</span>
          </p>
          <p v-if="item.attr_name">
            <span class="gray-txt1">规格：</span>
            <span>{{item.attr_name}}</span>
          </p>
          <p>
            <span class="gray-txt1">商品编号：</span>
            <span>{{item.product_num}}</span>
          </p>
          <p>
            <span class="gray-txt1">购买数量：</span>
            <span>{{item.num}}</span>
            <span class="red-txt" v-if="item.use_pnum && item.refund_num ">
              (已使用{{item.use_pnum}}已退款{{item.refund_num}})
            </span>
            <span class="red-txt" v-if="item.use_pnum && !item.refund_num ">
              (已使用{{item.use_pnum}})
            </span>
            <span class="red-txt" v-if="!item.use_pnum && item.refund_num ">
              (已退款{{item.refund_num}})
            </span>
          </p>
          <p v-if="item.target_date==2">
            <span class="gray-txt1">出行时间：</span>
            <span>{{item.target_date}}</span>
          </p>
          <div v-if="item.user_info" v-for="i in item.user_info">
            <span class="gray-txt1">身份信息：</span>
            <p  class="child">
              <span class="gray-txt1 id-name">姓名：</span>
              <span>{{i.name}}</span>
            </p>
            <p class="child " v-if="i.id_card">
              <span class="gray-txt1">身份证号：</span>
              <span>{{i.id_card}}</span>
            </p>
            <p class="child" v-if="i.mobile">
              <span class="gray-txt1">手机号：</span>
              <span>{{i.mobile}}</span>
            </p>
          </div>
          <div v-if="item.contact_info">
            <p  v-if="item.contact_info.name" >
              <span class="gray-txt1">联系人：</span>
              <span>{{item.contact_info.name}}</span>
            </p>
            <p  v-if="item.contact_info.mobile">
              <span class="gray-txt1">联系人手机号：</span>
              <span>{{item.contact_info.mobile}}</span>
            </p>
          </div>
          <p>
            <span class="gray-txt1">备注信息：</span>
            <span class="remark" ref="remark">{{item.remark}}</span>
          </p>
          <div v-if="item.refund_info" class="refundDetail">
            <h4>退款详情</h4>
            <div class="refundList">
              <p><span class="gray-txt1">商品单价：</span><span>￥{{item.refund_info.price}}</span></p>
              <p><span class="gray-txt1">退款数量：</span><span>{{item.refund_info.refund_pnum}}</span></p>
              <p><span class="gray-txt1">手   续   费 ：</span><span>￥{{item.refund_info.refund_fee}}</span></p>
              <p><span class="gray-txt1">退款金额：</span><span style="color: #f33;">￥{{item.refund_info.refund_money}}</span></p>
            </div>
          </div>
        </div>
        <div v-if="data.delivery_info" class="delivery-info">
          <h4>收货信息</h4>
          <p v-if="data.delivery_info.delivery_mode">
            <span class="gray-txt1">收货方式：</span>
            <span>{{data.delivery_info.delivery_mode}}</span>
          </p>
          <p v-if="data.delivery_info.delivery_name">
            <span class="gray-txt1">收货人姓名：</span>
            <span>{{data.delivery_info.delivery_name}}</span>
          </p>
          <p v-if="data.delivery_info.delivery_address">
            <span class="gray-txt1">收货人地址：</span>
            <span>{{data.delivery_info.delivery_address}}</span>
          </p>
        </div>
      </el-col>
      <el-col class="right" :span="7">
        <h4>订单处理批注</h4>
        <P class="gray-txt1">{{data.order_note}}</P>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../../config/api'
  import backBtn from '../public/back.vue'
  export default {
    components:{
      backBtn
    },
    data () {
        return{
          data:{},
          remark:'',
          param:{
            id:this.$route.params.id
          }
        }
    },
    computed:{
    },
    methods:{
      getOrderDetail(){
        api.getOrderDetail(this.param)
          .then(res=>{
            if(res.status){
              this.data=res.data
            }
          })
      }
    },
    created:function (){
      this.getOrderDetail()
      this.$store.commit('TAB_ACTIVE',1)
      this.$store.commit('CHANGE_TITLE','订单详情')
    },
    mounted:function () {
//      let remarks = this.$refs.name.offsetWidth
      this.$nextTick(function () {
        //let remarks = this.$refs.remark.style
      })

      let remarksHtml = ''
//      if(remarks){
//        let test = /\n/.test(remarks)
//        if (test) {
//          let arr = remarks.split('\n');
//          for (let i = 0; i < arr.length; i++) {
//            if (arr[i]) {
//              remarksHtml += '<span>' + arr[i] + '</span><br/>'
//            }
//          }
//          document.getElementById('remark').innerHTML=remarksHtml
//        }
//      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .order-detail{
    .left,.right{
      text-align: left;
      background: @color_white;
      .borderBox()
    }
    h4{
      margin-bottom: 10px;
      margin-top: 20px;
      height: 25px;
      line-height: 25px;
      border-left: 2px solid #10B0C3;
      background: #f5f5f5;
      font-size: 15px;
      color: #010101;
      font-weight: 600;
      padding-left: 10px;
    }
    .left{
      margin-left: 10px;
      float: left;
      padding: 15px 35px;
    }
    .right{
      float: right;
    }
    .box-one,.box-two{
      margin-top:20px;
    }
    .box-one{
      .left,.right{
        height: 75px;
      }
      p{
        line-height: 24px;
      }
    }
    .box-two{
      .child{
        padding-left: 68px;
        position: relative;
      }
      .id-name{
        display: inline-block;
      }
      .left,.right{
        min-height: 600px;
      }
      .left{
        p{
            border-bottom: 1px solid #dadadd;
            line-height: 30px;
          }
      }
    }
  }
</style>
