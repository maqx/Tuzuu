<template>
  <div class="login-page">
    <div class="login-header">
      <div class="login-logo">
        <div class="pic"><img src="../../../static/images/logo1.png"/></div>
        <div class="text">服务商管理平台</div>
      </div>
      <div class="login-tel">
        <span class="iconfont icon-tel"></span><span>客服热线：400-619-9679</span>
      </div>
    </div>
    <div class="login-content">
      <login-view v-show="this.$store.state.isShow"></login-view>
      <reset-view v-show="!this.$store.state.isShow"></reset-view>
    </div>
    <div class="login-footer">
      <img src="../../../static/images/FWZ_login_logo@2X.png" alt="">
      <div class="text">
        <h3>上海糖玩国际旅行社有限公司</h3> Copyright©2016 上海糖玩国际旅行社有限公司 | 网站备案号 沪ICP备14053561号-1
      </div>
    </div>
  </div>
</template>

<script>
  import loginView from './loginLs.vue'
  import ResetView from './reset.vue'
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    components:{
      loginView, ResetView
    },
    created:function () {
      this.$store.commit('CHANGE_TITLE','服务商-登录')
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  @import url("../../common/less/mixins.less");
  .login-page {
  .login-header {
    height: 115px;
    display: flex;
    align-items: center;
    width: @pageWidth;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
  .login-logo {
    display: flex;
    align-items: center;
  .pic {
    width: 68px;
    img{
      width: 100%;
    }
  }
  .text {
    margin-left: 20px;
    font-size: 28px;
    display: flex;
    align-items: center;
  }
  }
  .login-tel {
    color: @color_green;
    font-size: 20px;
  .iconfont {
    font-size: 24px;
  }
  }
  }
  .login-content {
    background: @body_bg;
    background: url(../../../static/images/FWZ_login@2X.png);
    background-repeat: no-repeat;
    background-position: center;
    height: 690px;
  .view {}
  }
  .login-footer {
    text-align: center;
    width: @pageWidth;
    margin-left: auto;
    margin-right: auto;
  img {
    margin-top: 32px;
  }
  .text {
  h3 {
    font-size: 18px;
    color: #707070;
    letter-spacing: 4px;
    line-height: 40px;
  }
  text-align:center;
  letter-spacing: 2px;
  line-height: 35px;
  font-size: 16px;
  color:#292626;
  }
  }
  }
</style>
