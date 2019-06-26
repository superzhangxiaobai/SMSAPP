<template>
	<view class="content">
		<!--自定义导航图片bgImage,bgColor,isBack-->
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">
				<!-- <image src="/static/cjkz.png" mode="aspectFill" style="width: 240upx;height: 60upx;"></image> -->
				我要打卡
			</block>
		</cu-custom>
		<view v-if="PageCur=='basics'">
			<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper>
			
			<view>
				<calendar 
				:date="now" 
				:lunar="false" @checkin="checkin"
				:disable-before="false" 
				:start-date="'2019-1-1'"
				:end-date="'2019-12-31'" :selected="selected"
				@change="change" :fixedHeihgt="fixedHeihgt"
				@to-click="toClick"
				 ></calendar>
			</view>
			
		</view>
		<view v-if="PageCur=='component'">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in iconList" :key="index" v-if="index<gridCol*2">
					<view :class="['icon-' + item.icon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view v-if="PageCur=='settings'">
			<view class="cu-list" :class="isCard?'no-card':''">
				<view class="cu-list menu-avatar">
					<view class="cu-item" @click="tologin">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey"> {{userName}} | {{role}} </view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="icon-circlefill text-grey"></text>
						<text class="text-grey">图标 + 标题</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">图片 + 标题</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<button class="cu-btn content" open-type="contact">
						<text class="icon-btn text-olive"></text>
						<text class="text-grey">Open-type 按钮</text>
					</button>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<text class="icon-discoverfill text-orange"></text>
						<text class="text-grey">Navigator 跳转</text>
					</navigator>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="icon-emojiflashfill text-pink"></text>
						<text class="text-grey">头像组</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="icon-btn text-green"></text>
						<text class="text-grey">按钮</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow">
							<text class="icon-upload"></text> 上传</button>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="icon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">标签</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="icon-warn text-green"></text>
						<text class="text-grey">文本</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">小目标还没有实现！</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="icon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
						<view class="text-gray text-sm">
							<text class="icon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
					</view>
					<view class="action">
						<switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='icon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">打卡</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='icon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">消息</view>
			</view>
			<view class="action" @click="NavChange" data-cur="settings">
				<view class='icon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='settings'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	import helper from '../../common/helper.js'
	import calendar from "../../components/uni-calendar/uni-calendar"
	export default{
		components: {
			calendar
		},
		computed:{...mapState['hasLogin','forcedLogin','userName','role']},
		data() {
			return {
				selected:[{date:'2019-6-10'},{date:'2019-6-11'}],
				fixedHeihgt: false,//自动高度
				screenWidth:350,
				TabCur:5,
				scrollLeft: 0,
				now:'2019-2-15',
				date:{id:5,year:'2019',month:'06'},
				modalName:'a',
				isCard:true,//头像是否卡片
				gridBorder:true,//分割线
				gridCol:3,//每行3个
				menuBorder: false,//边框
				menuArrow: true,//箭头
				menuCard: false,//卡片
				iconList: [{
						icon: 'cardboardfill',
						color: 'red',
						badge: 120,
						name: 'VR'
					}, {
						icon: 'recordfill',
						color: 'orange',
						badge: 1,
						name: '录像'
					}, {
						icon: 'picfill',
						color: 'yellow',
						badge: 0,
						name: '图像'
					}, {
						icon: 'noticefill',
						color: 'olive',
						badge: 22,
						name: '通知'
					}, {
						icon: 'upstagefill',
						color: 'cyan',
						badge: 0,
						name: '排行榜'
					}, {
						icon: 'clothesfill',
						color: 'blue',
						badge: 0,
						name: '皮肤'
					}, {
						icon: 'discoverfill',
						color: 'purple',
						badge: 0,
						name: '发现'
					}, {
						icon: 'questionfill',
						color: 'mauve',
						badge: 0,
						name: '帮助'
					}, {
						icon: 'commandfill',
						color: 'purple',
						badge: 0,
						name: '问答'
					}, {
						icon: 'brandfill',
						color: 'mauve',
						badge: 0,
						name: '版权'
					},
				],
				cardCur: 0,
				PageCur:'basics',
				skin:false,
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
				],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				elements: [{
						title: '操作条',
						name: 'bar',
						color: 'purple',
						icon: 'vipcard'
					},
					{
						title: '导航栏 ',
						name: 'nav',
						color: 'mauve',
						icon: 'formfill'
					},
					{
						title: '列表',
						name: 'list',
						color: 'pink',
						icon: 'list'
					},
					{
						title: '卡片',
						name: 'card',
						color: 'brown',
						icon: 'newsfill'
					},
					{
						title: '表单',
						name: 'form',
						color: 'red',
						icon: 'formfill'
					},
					{
						title: '时间轴',
						name: 'timeline',
						color: 'orange',
						icon: 'timefill'
					},
					{
						title: '聊天',
						name: 'chat',
						color: 'green',
						icon: 'messagefill'
					},
					{
						title: '轮播',
						name: 'swiper',
						color: 'olive',
						icon: 'album'
					},
					{
						title: '模态框',
						name: 'modal',
						color: 'grey',
						icon: 'squarecheckfill'
					},
					{
						title: '步骤条',
						name: 'steps',
						color: 'cyan',
						icon: 'roundcheckfill'
					},
					{
						title: '布局',
						name: 'ship',
						color: 'cyan',
						icon: 'newsfill'
					},
					{
						title: '背景',
						name: 'customer',
						color: 'blue',
						icon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						icon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						icon: 'icon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						icon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						icon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						icon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						icon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						icon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						icon: 'loading2'
					}
				],
			}
		},
		onLoad() {
			this.userName=helper.author;
			this.role='管理员';
			console.log(this.userName+"wowowo");
			uni.getSystemInfo({
				success: function (res) {
					this.screenWidth=res.screenWidth;
				}
			})
		},
		onReady() {
			
		},
		methods: {
			tologin(){
				console.log("没有登陆,去登陆")
				uni.navigateTo({
					url:"../login/login"
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			change(e) {
				console.log(e);
			},
			checkin(){
				console.log('checkin2 向后台发送数据, 记录打卡日期,')
			},
			toClick(e) {
				console.log("点击事件");
			},			
			todetail:function(e){
				var v=e.currentTarget.dataset.id;
				console.log(v);
				uni.navigateTo({
					url:"../detail/detail?id="+v
				})
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
	}
</script>

<style>
	.content{
		font-size: 30upx;
	}
</style>
