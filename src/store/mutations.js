/**
 * Created by mqx on 2017/6/13
 */
export default {
    CHANGE_ISSHOW(state, value) {
      state.isShow=value
    },
    CHANGE_TITLE(state,value){
      state.docTitle=value
      document.title=state.docTitle;
    },
    TAB_ACTIVE(state,val){
      state.tabActive=val
    },
    ACCOUNT_TAB(state,value){
      state.isTabShow=value;
    },
    CHANGE_COLOR(state,isFreeze,isCash){
      state.isFreezeShow=isFreeze;
      state.isCashShow=isCash;
    }
}
