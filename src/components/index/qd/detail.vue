/* * crate by mqx on 2017-05-10 */
<template>
  <div class="qd-detail">
    <back-btn title="渠道详情"></back-btn>
    <el-row class="detail">
      <el-col class="left-box font-size-14" :span="5">
        <div class="qd-name">
          <h4>渠道信息</h4>
          <p>
            <span class="gray-txt1">渠道名称:</span>
            <span>{{data.qd_info.qd_name}}</span>
          </p>
          <p>
            <span class="gray-txt1">服务者:</span>
            <span>{{data.qd_info.qd_server}}</span>
          </p>
          <p>
            <span class="gray-txt1">服务者联系方式:</span>
            <span>{{data.qd_info.qd_server_mobile}}</span>
          </p>
        </div>
        <div class="qd-money">
          <h4>渠道账户</h4>
          <div class="account">
            <p class="green-txt font-size-28 qd-account">{{data.qd_info.qd_account}}</p>
            <p class="gray-txt1">可提现金额(元)</p>
            <el-button class="green_btn top-up" >充值</el-button>
          </div>
        </div>
      </el-col >
      <el-col class="right-box font-size-14" :span="17">
        <h4>渠道概况</h4>
        <el-row class="box1">
          <el-col class="sales" :span="3">
            <div class="pic"></div>
            <p>销售</p>
          </el-col>
          <el-col class="data" :span="6">
            <p class="green-txt num font-size-22">{{data.qd_account_info.total_sales}}</p>
            <p class="txt">累计销售额<span class="gray-txt1 font-size-12">(元)</span></p>
            <p class="gray-txt1 font-size-12"><i class="iconfont icon-err font-size-12"></i>次日更新</p>
          </el-col>
          <el-col class="data" :span="6">
            <p class="green-txt num font-size-22">{{data.qd_account_info.total_orders}}</p>
            <p class="txt">累计订单量</p>
            <p class="gray-txt1 font-size-12"><i class="iconfont icon-err font-size-12"></i>次日更新</p>
          </el-col>
          <el-col class="data" :span="7">
            <p class="green-txt num font-size-22">{{data.qd_account_info.total_earning}}</p>
            <p class="txt">累计收益<span class="gray-txt1 font-size-12">(元)</span></p>
            <p class="gray-txt1 font-size-12"><i class="iconfont icon-err font-size-12"></i>实时更新</p>
          </el-col>
        </el-row>
        <el-row class="box2">
          <el-col class="share" :span="3">
            <div class="pic"></div>
            <p>分享数据</p>
          </el-col>
          <el-col class="data" :span="6">
            <p class="green-txt num font-size-22">{{data.qd_account_info.total_share}}</p>
            <p class="txt">累计分享数<span class="gray-txt1 font-size-12">(次)</span></p>
            <p class="gray-txt1 font-size-12"><i class="iconfont icon-err font-size-12"></i>实时更新</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../../../config/api'
  import backBtn from '../public/back.vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components:{
      ElRow,
      ElButton,
      ElCol,
      backBtn
    },
    data () {
      return{
        data:{
          qd_account_info:{},
          qd_info:{}
        },
        param:{
          qd_id:this.$route.params.id
        }
      }
    },
    computed:{
    },
    methods:{
      getQdDetail(){
        api.getQdDetail(this.param)
          .then(res=>{
            if(res.status){
              this.data=res.data
            }
          })
      }
    },
    created:function (){
      this.$store.commit('TAB_ACTIVE',2)
      this.$store.commit('CHANGE_TITLE','渠道')
      this.getQdDetail()
    },
    mounted:function () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .detail{
    margin-top:20px;
    h4{
      margin-bottom: 10px;
      height: 25px;
      line-height: 25px;
      border-left: 2px solid #10B0C3;
      background: #f5f5f5;
      font-size: 15px;
      color: #010101;
      font-weight: 600;
      padding-left: 10px;
    }
    .left-box{
      text-align: left;
      .qd-name,.qd-money{
        width: 100%;
        .borderBox();
        padding: 30px;
      }
      .qd-name{
        margin-bottom:20px;
        p{
            line-height: 30px;
            border-bottom: 1px solid #dadadd;
        }
      }
      .qd-money{
        .account{
          text-align: center;
          .qd-account{
            font-weight: 600;
          }
        }
        .top-up{
          background: #00bfa5;
          width: 100%;
          line-height: 26px;
          margin-top: 20px;
        }
      }
    }
    .right-box{
      float: right;
      padding: 30px;
      text-align: left;
      min-height: 600px;
      .borderBox();
      .box1{
        margin: 35px 0;
      }
      .sales{
        padding: 20px;
        width: 100px;
        height: 90px;
        text-align: center;
        border-right: 1px solid #dadadd;
        .pic{
          height: 50px;
          background: url(/static/images/bg.png);
          background-repeat: no-repeat;
          background-position: -47px -113px;
        }
      }
      .data{
        padding-left: 20px;
        padding-top: 11px;
        height:90px;
        .txt{
          line-height: 30px;
        }
        .num{
          font-weight: 600;
        }
      }
      .share{
        padding: 20px;
        width: 100px;
        height: 90px;
        text-align: center;
        border-right: 1px solid #dadadd;
        .pic{
          height: 50px;
          background: url(/static/images/bg.png);
          background-repeat: no-repeat;
          background-position: 3px -115px;
        }
      }
      .box2{
        margin-top: 20px;
      }
    }
  }
</style>
