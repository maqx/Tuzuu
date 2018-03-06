<template>
	<div class="view">
		<div class="main-box">
			<h2>服务商登录</h2>
			<div class="box-padding">
				<h3><span class="iconfont icon-user"></span>服务商登录</h3>
				<div class="input_box">
					<p class="box">
						<span class="iconfont icon-mobile"></span>
						<input v-model="ueserName" type="text" @fous="" @blur="checkMobile()" class="user" maxlength="11" placeholder="请输入手机号">
					</p>
					<span v-show="isMbl_err" class="err-msg"><span class="iconfont icon-err"></span><span class="err-txt" v-text="mobile_err"></span></span>
				</div>
				<div class="input_box">
					<p class="box">
						<span class="iconfont icon-lock"></span>
						<input v-model="password" @blur="checkPassword()"  type="password" class="password" placeholder="请输入密码">
					</p>
					<span v-show="isPsw_err" class="err-msg"><span class="iconfont icon-err"></span><span class="err-txt" v-text="password_err"></span></span>
				</div>
				<div class="password-tip">
          <el-checkbox class="checkbox" v-model="checked">记住密码</el-checkbox>
          <a @click="toReset" id="reset_pwd" >忘记密码?</a>
				</div>
				<p class="input_box">
					<input @click="login()" type="button" value="登  录" class="green-btn" id="submit">
				</p>
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
        checked:true,
        isPsw_err:false,
        password_err:'',
        isMbl_err:false,
        mobile_err:'',
        param:{
          mobile:null,
          password:null
        }
			}
		},
		created() {

		},
		computed: {

		},
		methods: {
			login() {
			    if(this.checkMobile && this.checkPassword()){
            this.param.mobile=parseInt(this.ueserName)
            this.param.password=this.password
            api.Login(this.param)
              .then(res=>{
                if(res.status) {
                  this.$router.push({path:'/order'})
                } else {
                  if(res.body.errno==='illegal_mobile'){
                    this.mobile_err=res.body.errmsg
                    this.isMbl_err=true;
                  }else if(res.body.errno==='login_error'){
                    this.password_err=res.body.errmsg
                    this.isPsw_err=true;
                  }else{
                    this.mobile_err='';
                    this.isMbl_err=false;
                    this.password_err='';
                    this.isPsw_err=false;
                  }
                }
              })
          }
			},
      checkMobile(){
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(this.ueserName)) {
          this.mobile_err='';
          this.isMbl_err=false;
          return true;
        }else{
          if(this.ueserName===""){
              this.mobile_err='请输入手机号码';
          }else{
              this.mobile_err='请输入正确的手机号码'
          }
          this.isMbl_err=true;
          return false
        }
      },
      checkPassword(){
        let reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (reg.test(this.password)) {
          this.isPsw_err=false;
          return true
        }else{
          if(this.password===""){
            this.password_err='请输入密码'
          }else{
            this.password_err='密码为6至16位数字及字母组合，字母不区分大小写'
          }
          this.isPsw_err=true;
        }
        return false
      },
      toReset(){
			    this.$store.commit('CHANGE_ISSHOW',false)
      }
		},
		components: {}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url("../../common/less/login.less");
</style>
