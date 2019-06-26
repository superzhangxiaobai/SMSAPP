<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<image class="logo" src="../../static/logo.png"></image>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<image class="logo" src="../../static/logo.png"></image>
		<!-- #endif -->
		<view class="input-row">
			<text class="title">账号:</text>
			<input type="text" clearable focus placeholder="请输入账号" v-model="username"></input>
		</view>
		<view class="input-row">
			<text class="title">密码:</text>
			<input type="password" displayable  placeholder="请输入密码" v-model="password"></input>
		</view>
		<view class="btn-row">
		    <button type="primary" class="primary" @tap="formSubmit">登录</button>
		</view>
		<view class="action-row" >
		    <view @click="WEIXIN_login">
				<image src="/static/logo.png" class="other-icon"></image>
			</view>
		    <text>|</text>
			<view @click="WEIXIN_login">
				<image src="/static/logo.png" class="other-icon"></image>
			</view>
		</view>
		<view class="action-row">
		    <navigator url="../reg/reg">注册账号</navigator>
		    <text>|</text>
		    <navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
		<view class="action-row">
		    <text class="title">{{author}}</text>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
		    <view class="oauth-image" v-for="(provider,index) in providerList" :key="index">
		        <image class="tip-image" :src="provider.image"></image>{{provider.value}}
		    </view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				username: '',
				password:'',
				positionTop:100,
				providerList:[],
				hasProvider:false,
				author:''
			}
		},
		onLoad() {
			this.author=helper.author;
		},
		computed:{...mapState(['baseUrl','hasLogin','forcedLogin','userName'])},//对应store里的数据
		methods: {
			...mapMutations['login'],//不需要强制登录
			WEIXIN_login(){
				console.log('aaaa')
				debugger;
				/* wx.login({
					success:function(res){
						console.log("登陆成功")
						console.log(res)
					},
					fail(res2) {
						console.log("登陆失败")
						console.log(res2)
					}
				}) */
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					console.log(loginRes);
					console.log(11)
				  },fail() {
				  	console.log('登陆失败')
				  }
				});
			},
			formSubmit() {
				console.log(this.baseUrl);
				console.log(this.hasLogin);
				console.log(this.username+this.password);
				uni.request({
					header:{
						'Content-type':'application/x-www-form-urlencoded',
					},
					url:this.baseUrl+"/app/login",
					method:'POST',
					data:{username:this.username,password:this.password},
					success:(res)=>{
						if(res.data.code=='200'){
							uni.reLaunch({
								url:"../index/index"
							})
							this.providerList=[];
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg,
								duration:1000
							})
						}
						this.hasProvider=true;
						this.providerList.push({value:res.data.msg,image:'../../static/c1.png'})
					}
				})
			},
		},
	}
</script>

<style>
	.content {
		text-align: center;
		color: #000000;
		font-size: 30upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
		margin-bottom: 100upx;
    }
	.other-icon{
		width: 30upx;
		height: 30upx;
		margin: 0 20upx 20upx 20upx;
	}
	.primary{
		background-color:#339966;//登录按钮颜色
		width: 400upx;
	}
	.action-row{
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 26upx;
	}
	.input-row{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.btn-row{
		margin:50upx;
	}
	.tip-image{
		width: 20upx;
		height: 20upx;
	}
	.oauth-row{
		font-size:26upx;
		color: red;
	}
</style>
