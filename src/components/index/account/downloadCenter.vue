<template>
  <div class="download-center">
    <div class="tab">
      <left-tab :leftTab="leftTab" hasChildTags="false"></left-tab>
    </div>
    <div class="right-content">
      <div class="top">
        <span>操作类型：</span>
        <el-select class="cope" v-model="cope_status.value" placeholder="全部">
          <el-option v-for="i in cope_status.list"  :label="i.name" :value="i.id">
          </el-option>
        </el-select>
        <span>生成状态：</span>
        <el-select class="cope" v-model="generate_status.value" placeholder="全部">
          <el-option v-for="i in generate_status.list" :label="i.name" :value="i.id">
          </el-option>
        </el-select>
        <el-button class="green_btn" @click="searchFn">搜索</el-button>
      </div>
      <div v-loading="loading" class="lists">
        <ul class="list-title">
          <li class="create-time">创建时间</li>
          <li>操作类型</li>
          <li>类型详情</li>
          <li class="date">所选日期</li>
          <li>生成状态</li>
          <li>操作</li>
        </ul>
        <div  class="list"  v-if="data.total">
          <ul  class="item"  v-for="item in data.list">
            <li class="create-time">{{item.create_dt|DateTime}}</li>
            <li v-if="item.params.export_type==1" class="type">可用金额流水</li>
            <li v-if="item.params.export_type==2" class="type">冻结金额流水</li>
            <li v-if="item.params.export_type==11" class="type">结算明细</li>
            <li v-if="item.params.export_type==31" class="type">渠道总评价</li>
            <li v-if="item.params.export_type==32" class="type">服务者带团评价</li>
            <li v-if="item.params.export_type==33" class="type">单个团评价</li>
            <li >
              <span v-if="item.params.operate_name" class="type-detail">{{item.params.operate_name}}</span>
            </li>
            <li class="date">
              <span class="date" v-if="item.export_type!=31 && item.export_type!=33">
              {{item.params.start_time|formatDate}}至{{item.params.end_time|formatDate}}
		          </span>
              <span class="date" v-if="item.export_type!=31 && item.export_type==33">
                {{item.params.start_time}}
		          </span>
            </li>
            <li>
              <span v-if="item.status==1" class="status">生成中</span>
              <span v-if="item.status==2" class="status">已生成</span>
              <span v-if="item.status==3" class="status red-txt">生成失败</span>
            </li>
            <li>
              <a :href="item.oss_address" v-if="item.status==2"  class="green-txt">下载</a>
              <a  v-if="item.status==3" href="#" @click="rebuildFn(item.id,item.params.operate_name,item.params.start_time,item.params.end_time)"  class="green-txt">重新生成</a>
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
</template>

<script>
  import leftTab from '../public/leftTab.vue'
  import Pages from '../public/page.vue'
  import api from '../../../config/api'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    name: 'order',
    components:{
      ElButton,
      leftTab,
      Pages
    },
    data () {
      return {
        currentPage:1,
        loading:false,
        leftTab:{
          title:'财务',
          list:[
            {title:'个人账户',id:1,to:'/account',active:''},
            {title:'结算明细',id:2,to:'/account/billingDetails',active:''},
            {title:'下载中心',id:3,to:'/account/downloadCenter',active:'active'}
          ]
        },
        cope_status:{
          list:[
            {
              name:'结算明细',
              id:11
            },
            {
              name:'可提现金额流水',
              id:1
            },
            {
              name:'冻结金额流水',
              id:2
            },
            {
              name:'渠道总评价',
              id:31
            },
            {
              name:'服务者带团评价',
              id:32
            },
            {
              name:'单个团评价',
              id:33
            }
          ],
          value:11
        },
        generate_status:{
          list:[
            {
              name:'全部',
              id:0
            },
            {
              name:'生成中',
              id:1
            },
            {
              name:'已生成',
              id:2
            },
            {
              name:'生成失败',
              id:3
            }
          ],
          value:0
        },
        data:{},
        param:{
          page:1,
          perpage:10,
          export_type:11,
          status:0
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage=val
        this.loading=true
        this.param.page = val
        this.getSettlementExportList(this.param)
      },
      handleSizeChange:function (val) {
        console.log(val)

      },
      getSettlementExportList(param){
        api.getSettlementExportList(param)
          .then(res=>{
              if(res.status){
                  this.data=res.data
                this.loading =false
              }
          })
      },
      //重新下载
      rebuildFn(id,name,start_time,end_time){
        console.log(url)
      },
      //搜索
      searchFn(){
        this.currentPage=1
        this.loading=true
        this.param.page = 1
        this.param.status=this.generate_status.value
        this.param.export_type=this.cope_status.value
        this.getSettlementExportList(this.param)
      }
    },
    created(){
      this.$store.commit('TAB_ACTIVE',3)
      this.$store.commit('CHANGE_TITLE','服务商-财务')
      this.getSettlementExportList(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .download-center{
    overflow:hidden;
    .tab{
      float: left;
    }
    .right-content{
      width: 824px;
      float: right;
      .borderBox();
        padding:0;
      .top{
        text-align: left;
        padding: 20px;
        .cope{
          width: 160px;
        }
      }
      .lists{
        min-height:686px;
        position:relative;
        li{
          display: inline-block;
          width: 100px;
        }
        .date{
          width: 240px;
        }
        .create-time{
          width: 160px;
        }
        .list{
          .item{
            height: 58px;
            line-height: 58px;
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
</style>
