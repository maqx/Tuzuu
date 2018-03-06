/**
 * Created by mqx on 2017/6/13
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import state from "./state"
import mutations from './mutations'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: debug,
})
