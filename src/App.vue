<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import api from './config/api.js'
export default {
  name: 'app',
  created:function () {

  },
  methods:{
    checkLogin(){
      //检查是否存在token
      //debugger
      if(!window.localStorage.getItem("token")){
        this.$router.push('/login');
      }else{
        this.$router.push('/chose/hotel');
      }
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
