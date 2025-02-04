import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'
import util from './common/util.js'
import axios from 'static/cdn.staticfile.org_axios_0.18.0_axios.min.js'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.prototype.$userInfo={
	nickName:"tiny"
};

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$util = util

const app = new Vue({
	store,
    ...App
})
app.$mount()
