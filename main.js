import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store=store
//Vue.prototype.author2='xiaobai2'

App.mpType = 'app'

import basics from './components/basics/home.vue'
Vue.component('basics',basics)

import components from './components/component/home.vue'
Vue.component('components',components)

import plugin from './components/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
