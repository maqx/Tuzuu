<template>
  <div class="group-comments-list content">
    <back-btn :title="title">
      <el-button @click="checkOutFn" class="green_btn font-size-22 checkout" slot-sope="item ">导出</el-button>
    </back-btn>
    <div v-loading="loading" class="lists">
      <ul class="list-title">
        <li>用户名称</li>
        <li>手机号</li>
        <li>提交日期</li>
        <li class="star">平均星级</li>
        <li>操作</li>
        <li>处理结果</li>
      </ul>
      <div v-if="lists.total">
        <ul  v-for="item in lists.list" class="list">
          <li class="name">{{item.name}}</li>
          <li class="mobile">{{item.mobile}}</li>
          <li v-if="item.comment==0" class="date">
            ——
          </li>
          <li v-else class="date" >{{item.update_dt| formatDate}}</li>
          <li v-if="item.comment==0" class="star">
            ——
          </li>
          <li v-else  class="star">
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
          <li v-if="item.comment==0" class="operate">
            ——
          </li>
          <li class="operate" v-else >
            <router-link to="/qd/CommentInfo/352/112/49/少林寺小分队/张红伟/97/20170930/''/张三丰" class="oprater ">评论</router-link>
          </li>
          <li v-if="item.complaint_id>0" class="result">
            <router-link to="/qd/serviceGroupLlist/49/112/少林寺小分队/张红伟" class="oprater ">有客诉</router-link>
          </li>
          <li v-else class="result" style="color: #666;">无客诉</li>
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
          tourist_group_id:97,
          page:1,
          perPage:10,
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
      // 获取评价管理列表
      getCommentList(param){
        api.getCommentList(param)
          .then(res=>{
            if(res.status){
              this.lists=res.data
              this.loading=false
            }
          })
      },
      // 导出
      checkOutFn(){
        let tip = `<p class="font-size-24"><i style="color: #10b0c3;" class="iconfont font-size-24 iconfont-success"></i></p>
        <p><span style="color: #10b0c3;">${this.$route.params.date}</span> <span>的报表文件正在生成，请至下载中心下载。</span> </p>`
        this.$confirm( tip, '', {
          confirmButtonText: '前往下载中心',
          cancelButtonText: '我知道了',
          center: true,
          dangerouslyUseHTMLString:true
        }).then(() => {

        }).catch(() => {

        });
      }
    },
    created: function () {
      this.$store.commit('TAB_ACTIVE',2)
      this.$store.commit('CHANGE_TITLE','渠道')
      this.param.tourist_group_id=this.$route.params.tourist_group_id
      this.title=this.$route.params.qd_name+'-'+this.$route.params.tzu_name+'-['+this.$route.params.title+']'
      this.getCommentList(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .group-comments-list{
    .checkout{
      height: 40px;
      width: 100px;
    }
    .lists{
      position: relative;
      min-height: 600px;
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
