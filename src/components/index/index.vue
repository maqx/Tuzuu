<template>
  <div class="home">
    <header class="header">
      <div class="tel font-size-16"><p class="txt"><span class="font-size-18 iconfont icon-tel"></span><span>客服热线：400-619-9679</span></p></div>
      <div class="wrap">
        <div class="header-tab">
          <div class="title">
            <div class="pic">
              <img src="/static/images/logo1.png"/>
            </div>
            <div class="text">服务商管理平台</div>
          </div>
          <div class="tab">
            <ul>
              <li class="grey">
                <div>
                  <div class="pic">
                    <span class="iconfont icon-index"></span>
                  </div>
                  <span>首页</span>
                </div>
              </li>
              <li v-for="item in tabList"  :class="$store.state.tabActive==item.id?'active':''" data-id="1" @click="changeTab(item.id)">
                <router-link :to="item.to" class='link-txt'>
                  <div class="pic">
                    <span :class="item.icon" class="iconfont"></span>
                  </div>
                  <p>{{item.name}}</p>
                </router-link>
              </li>
              <li class="grey">
                <div>
                  <div class="pic">
                    <span class="iconfont icon-center"></span>
                  </div>
                  <span>通知中心</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="user_box" @click="ueserMsgShow">
            <div class="pic">
              <img :src="headImg" alt="">
            </div>
            <span class="iconfont icon-bottom" :class="active"></span>
            <ul class="dropdown" v-show='show'>
              <li>
                <a><span class="iconfont icon-user_1">{{name}}</span> <span class="remark">服务商管理者</span></a>
              </li>
              <li>
                <a id="loginOut"><span class="iconfont icon-quit"></span>退出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <router-view class="content"/>
    <footer class="footer font-size-16">Copyright©2016 上海糖玩国际旅行社有限公司 | 网站备案号 沪ICP备14053561号-1</footer>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        show: false,
        active: '',
        name: '陆雅颖',
        headImg: '',
        tabActive1: 'active',
        tabActive2: '',
        tabActive3: '',
        user:{},
        tabList:[
            {
            id:1,
              icon:'icon-qd',
            to:'/order',
              name:'订单'
            },
          {
            id:2,
            icon:'icon-order',
            to:'/qd',
            name:'渠道'
          },
          {
            id:3,
            icon:'icon-financial',
            to:'/account',
            name:'财务'
          }
        ]
      }
    },
    methods:{
      ueserMsgShow: function() {
        this.show = !this.show
        if(this.show) {
          this.active = 'active'
        } else {
          this.active = ''
        }
      },
      changeTab: function(data) {
        this.tabActive1 = ''
        this.tabActive2 = ''
        this.tabActive3 = ''
        if(data === 1) {
          this.$store.commit('TAB_ACTIVE',1)
        } else if(data === 2) {
          this.$store.commit('TAB_ACTIVE',2)
        } else if(data === 3) {
          this.$store.commit('TAB_ACTIVE',3)
        }
      }
    },
    mounted(){
//      this.$store.commit('TAB_ACTIVE',1)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less"   scoped>
  @import url("../../common/less/mixins.less");
  .header{
    width: 100%;
    background: #464648;
    height: 140px;
    .tel {
      .txt{
        padding-right:  100px;
      }
      width: 100%;
      min-width: 1000px;
      height: 30px;
      line-height: 30px;
      background: #10B0C3;
      color: #fff;
      text-align: right;
      .iconfont {
        margin-right: 4px;
      }
    }
    .wrap {
      background: url(/static/images/bg.png);
      height: 110px;
      background-repeat: no-repeat;
      background-position-x: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 1000px;
      margin: 0 auto;
      position: relative;
      .tel {
        position: absolute;
        top: -25px;
        right: 0;
        color: #fff;
        font-size: 16px;
        .iconfont {
          position: absolute;
          margin-left: -18px;
          font-size: 18px;
        }
      }
      .header-tab {
        display: flex;
        .title {
          display: flex;
          align-items: center;
          .pic {
            width: 68px;
            height: 68px;
            img{
              width: 100%;
            }
          }
          .text {
            margin-left: 20px;
            font-size: 28px;
            color: @color_white;
          }
        }
        .tab ul {
          display: flex;
          li {
            .link-txt {
              width: 102px;
              height: 110px;
              color: #d2d2d2;
              text-decoration: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction:column;
            }
            display: flex;
            align-items: center;
            justify-content: center;
            width: 102px;
            height: 110px;
            .pic {
              .transition(all,
                200ms);
              width: 46px;
              height: 46px;
              .radius(@rd: 46px);
              background: @color_green;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 10px;
              .iconfont {
                font-size: 35px;
                line-height: 44px;
                color: #d2d2d2;
              }

            }
          }
          li.grey {
            color: #fff;
            text-align: center;
            .opacity(@op: 0.6);
            .pic {
              background: rgb(160, 161, 161);
            }
            .iconfont {
              color: @color_white;
            }
          }
          li.active {
            .link-txt {
              color: @color_white;
            }
            .opacity(@op: 1);
            position: relative;
            .pic {
              background: @color_green;
              .scale(1.4);
              .iconfont {
                color: @color_white;
              }
            }
            &::before {
              content: '';
              position: absolute;
              width: 100%;
              height: 4px;
              background: @color_green;
              bottom: 0;
              left: 0;
            }
            &::after {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              bottom: 4px;
              left: 45px;
              border-width: 0 5px 5px;
              border-style: solid;
              border-color: transparent transparent @color_green;
            }
          }
        }
        .user_box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 152px;
          height: 110px;
          border-left: 1px solid @color_white;
          cursor: pointer;
          .pic {
            width: 63px;
            height: 63px;
            background-image: url(/static/images/bg.png);
            background-position: -193px -113px;
            background-repeat: no-repeat;
            .radius(@rd: 63px);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              .radius(@rd: 65px);
            }
          }
          &>.iconfont {
            color: @color_white;
            font-size: 20px;
            margin-left: 20px;
            .transition(@property: transform,
              @duration: 300ms)
          }
          .active {
            .rotate(@deg: 180deg)
          }
          .dropdown {
            width: 150px;
            position: absolute;
            top: 110px;
            right:54px;
            background: #4d5050;
            display: flex;
            align-content: flex-start;
            flex-direction: column;
            z-index:9999;
            li {
              border-bottom: 1px solid @color_white;
              display: flex;
              align-items: center;
            }
            a {
              color: #fff;
              font-size: 14px;
              padding: 10px;
              cursor: pointer;
              .iconfont {}
              .remark {
                font-size: 16px;
                .scale();
                display: block;
                margin-top: 5px;
                margin-right: -60px;
              }
            }
          }
        }
      }
    }
  }
  .content{
    width: 1000px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  .footer{
    margin-top: 20px;
    letter-spacing: 2px;
    color: #292626;
  }
</style>
