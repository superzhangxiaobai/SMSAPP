<template>
	<view class="content">
		这里是详情页{{id}}
	</view>
</template>

<script>
	export default{
		data() {
			return {
				id:''
			}
		},
		onLoad(option) {
			console.log(option.id);
			this.id=option.id;
		}
	}
</script>

<style>
</style>
