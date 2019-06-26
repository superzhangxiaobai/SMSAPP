<template>
	<view class="content">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">邮件</view>
				<input placeholder="两字短标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">输入框</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">收货地址</view>
				<input placeholder="统一标题的宽度" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">收货地址</view>
				<input placeholder="输入框带个图标" name="input"></input>
				<text class='icon-locationfill text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮" name="input"></input>
				<button class='cu-btn bg-green shadow'>验证码</button>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入框带标签" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">普通选择</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">多列选择</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="title">时间选择</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group margin-top">
				<view class="title">开关选择</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<!-- #ifdef MP-ALIPAY -->
				<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
				<!-- #endif -->
		
				<!-- #ifndef MP-ALIPAY -->
				<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
				<!-- #endif -->
			</view>
			<view class="cu-form-group">
				<view class="title">定义图标</view>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">方形开关</view>
				<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
			</view>
			<!-- #endif -->
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group margin-top">
					<view class="title">单选操作(radio)</view>
					<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">定义样式</view>
					<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">定义颜色</view>
					<view>
						<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
						<radio class='red margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
					</view>
				</view>
				<!-- #endif -->
			</radio-group>
			<checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-form-group margin-top">
					<view class="title">复选选操作(checkbox)</view>
					<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">定义形状</view>
					<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
				</view>
				<view class="cu-form-group">
					<view class="title">定义颜色</view>
					<checkbox class='round blue' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false"
					 value="C"></checkbox>
				</view>
				<!-- #endif -->
			</checkbox-group>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="'background-image:url(' + imgList[index] +')'" v-for="(item,index) in imgList"
					 :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='icon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='icon-cameraadd'></text>
					</view>
				</view>
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">文本框</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		methods: {
			logout() {
				uni.navigateTo({
					url:"../login/login"
				});
			}
		},
	}
</script>

<style>
	.primary{
		width:100%;
		background-color: #339966;
	}
</style>
