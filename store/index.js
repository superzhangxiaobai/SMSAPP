import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		baseUrl:'http://192.168.101.166:8088/SMS',
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		role:'',
		token:''
    },
    mutations: {
        login(state, username) {
			state.token='';//这里是后台的session
            state.userName = username || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})

export default store
