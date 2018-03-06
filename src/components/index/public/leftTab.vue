/* * crate by mqx on 2017-05-10 */
<template>
  <div class="left-tab">
    <div class="left-tab-btn">{{leftTab.title}}</div>
    <router-link  v-if="!hasChildTags" v-for="item in leftTab.list" :key="item.id" :class="item.active" class="left-tab-btn link-txt" :to="item.to">{{item.title}}</router-link>
    <div v-if="hasChildTags" v-for="item in leftTab.list">
      <router-link  :key="item.id" :class="item.active" class="left-tab-btn link-txt" :to="item.to">{{item.title}}</router-link>
      <router-link  v-for="j in item.childLists" :key="j.id" :class="j.active" class="left-tab-btns link-txt" :to="j.to">{{j.title}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      hasChildTags:false,
      leftTab:null
    },
    computed:{
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" type="text/css" scoped>
  @import url("../../../common/less/mixins.less");
  .left-tab {
    width: @leftWidth;
    height: @pageHeight;
    border: @boxBorder;
    padding-top: 20px;
    background-color: @color_white;
  .radius(@rd: 5px);
  .left-tab-btn {
    display: flex;
    list-style: none;
    height: 66px;
    width:@leftWidth - 40px;
    padding-left: 40px;
    align-items: center;
    color: @title_txt2;
    font-size: 18px;
    cursor: pointer;
  }
  .left-tab-btns{
    display: block;
    line-height: 40px;
  }
  .active {
    border-width: 1px 1px 1px 5px;
    border-color: @border_color @color_white @border_color @color_green;
    border-style: solid;
    font-weight: 600;
    padding-left: 35px;
  }
  .childActive{
    color: @color_green;
  }
  }
</style>
