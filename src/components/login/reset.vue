<template>
		<div class="view">
			<div class="main-box">
				<h2>重置你的账户密码</h2>
				<div class="box-padding">
					<h3><span class="iconfont icon-lock"></span>重置账户密码</h3>
					<div class="input_box">
						<p class="box">
							<span class="iconfont icon-mobile"></span>
							<input v-model="ueserName" type="text"  class="user" maxlength="11" placeholder="请输入手机号">
						</p>
						<span class="err-msg"><span class="iconfont icon-err"></span><span class="err-txt">密码错误</span></span>
					</div>
					<div class="input_box">
						<p class="box">
							<span class="iconfont icon-lock"></span>
							<input v-model="code" type="text"  class="code" placeholder="请输入验证码">
              <input @click="login" type="button" value="获取短信验证码" class="green-btn" id="getCode">
						</p>
						<span class="err-msg"><span class="iconfont icon-err"></span><span class="err-txt"></span></span>
					</div>
					<p class="input_box">
						<input @click="login" type="button" value="重置密码" class="green-btn" id="submit">
					</p>
          <a class="back-login" @click="toLogin">返回登录页<i class="iconfont icon-back"></i></a>
				</div>
			</div>
		</div>
</template>
<script>
  import api from '../../config/api'
  export default {
    data() {
      return {
        password: '',
        ueserName: '',
        code:'',
      }
    },
    created() {

    },
    computed: {

    },
    methods: {
      login() {
        api.login({
          mobile: 17612150914,
          password: 'qwer123'})
          .then(res=>{
            console.log(res)
            this.status = res.body.status
            if(res.body.status) {
              console.log(res)
              $router.to('/order')
            } else {
              console.log(this.ueserName, this.password)
            }
          })
      },
      toLogin(){
        //this.$store.commit('CHANGE_ISSHOW',true)
      }
    },
    components: {}
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
  @import url("../../common/less/login.less");
</style>
