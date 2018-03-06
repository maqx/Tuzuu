<template>
  <div class="comments-info content">
    <back-btn :title="title">
      <el-button @click="savePicFn" class="green_btn font-size-22 savePic" slot-sope="item ">保存</el-button>
    </back-btn>
    <el-row v-loading="loading" class="detail  font-size-18">
      <el-col class="title-txt"  :span="4">
        1.接送按时情况
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment1" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment1)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment1).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt"  :span="4">
        2.导游服务态度
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment2" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment2)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment2).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt" :span="4">
        3.导游讲解水平
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment3" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment3)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment3).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt"  :span="4">
        4.司机服务态度
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment4" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment4)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment4).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt"  :span="4">
        5.行程安排情况
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment5" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment5)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment5).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt"  :span="4">
        6.住宿安排情况
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment6" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment6)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment6).toFixed(1)}}</span>
      </el-col>
      <el-col  class="title-txt"  :span="4">
        7.用餐安排情况
      </el-col>
      <el-col :span="20">
        <img v-for="item in data.part_comment7" class="all" src="/static/images/StarAll.png" /><img  v-for="item in (5-data.part_comment7)" class="none all" src="/static/images/StarNone.png" />
        <span style="color: #10B0C3;font-size: 14px;">{{parseFloat(data.part_comment7).toFixed(1)}}</span>
      </el-col>
      <el-col class="title-txt">用户评论/评价</el-col>
      <el-col class="comment_detail">{{data.remark}}</el-col>
    </el-row>
  </div>
</template>

<script>
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
    },
    data () {
      return {
        data:{
            part_comment1:[],
          part_comment2:[],
          part_comment3:[],
          part_comment4:[],
          part_comment5:[],
          part_comment6:[],
          part_comment7:[]
        },
        currentPage:1,
        loading:false,
        title:'',
        param:{
          id:''
        },
      }
    },
    methods: {
      // 获取评价管理列表
      getCommentDetail(param){
        api.getCommentDetail(param)
          .then(res=>{
            if(res.status){
              this.data=res.data
              this.loading=false
            }
          })
      },
      //截图保存图片
      savePicFn(){

      }
    },
    created: function () {
      this.$store.commit('TAB_ACTIVE',2)
      this.$store.commit('CHANGE_TITLE','渠道')
      this.param.id=this.$route.params.id
      this.title=this.$route.params.qd_name+'-'+this.$route.params.tzu_name+'-['+this.$route.params.title+']-'+this.$route.params.name
      this.getCommentDetail(this.param)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .comments-info{
    .savePic{
      height: 40px;
      width: 100px;
    }
    .detail{
      .borderBox();
      margin-top: 20px;
      width: 100%;
      text-align: left;
      .comment_detail{
        border: 1px solid #dadadd;
        .radius(@rd: 5px);
        padding: 20px 30px;
        min-height: 160px;
      }
      .el-col{
        margin: 15px 0;
      }
    }
  }
</style>
