<template>
	<view class="device-item" :style="deviceThem" @click="editDevice">
		<!-- #ifdef MP-WEIXIN -->
		<canvas v-if="showCanvas" class="device-icon" id="deviceIcon" canvas-id="deviceIcon" />
		<!-- #endif -->
		<view class="device-head">
			<image :src="image"></image>
			<view class="device-info">
				<text class="device-name">{{ device.deviceName }}</text>
				<text class="device-type">{{ device.deviceType }}</text>
			</view>
		</view>
		<view class="card-code">
			<view style="width: 60%;">
				<text class="omit-left">型号: </text>
				<text class="omit-left">{{ device.deviceCode }}</text>
			</view>
		</view>
		<view class="card-code">
			<view style="width: 60%;">
				<text class="omit-left">功率: </text>
				<text class="omit-left">{{ device.power }}</text>
			</view>
			<view style="width: 40%;">
				<text class="omit-right">库存: </text>
				<text class="omit-right">{{ device.store }}</text>
			</view>
		</view>
		
		<view class="card-code">
			<view style="width: 50%; margin: 5px;">
				<button size="large" type="primary" style="opacity: 0.8;" @click.stop="storeIn">入库</button>
			</view>
			<view style="width: 50%; margin: 5px;">
				<button size="large" type="warn" style="opacity: 0.8;" @click.stop="storeOut">出库</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { deviceDetail } from '@/api/system/device.js'
	export default {
		name: 'deviceDetail',
		props: {
			device: { type: Object, required: true}
		},
		computed: {
			waterMark() {
				return `background-image: url(${this.image});`
			}
		},
		data() {
			return {
				deviceThem: '',
				image: '',
				showCanvas: true,
				// #ifdef MP-WEIXIN
				uuid: 'deviceIcon',
				// #endif
			};
		},
		onLoad() {
			
		},
		methods: {
			async buildItem() {
				this.showCanvas = false;
			},
			editDevice() {
				this.$tab.navigateTo('/pages/device/edit?id=' + this.device.id)
			},
			storeIn() {
				this.$tab.navigateTo('/pages/device/storeAdd?id=' + this.device.id)
			},
			storeOut() {
				this.$tab.navigateTo('/pages/device/storeSub?id=' + this.device.id)
			}
		},
		created() {
			this.$nextTick(() => {
				this.buildItem();
			});
		}
	};
</script>

<style>
	.omit-left {
		text-align: left;
		font-size: 40rpx;
		margin-left: 30rpx;
	}
	.omit-right {
		font-size: 40rpx;
		margin-right: 30rpx;
	}
	.card-code {
		margin-top: 15rpx;
		display: flex;
		color: #FFFFFF;
		font-size: 38rpx;
		
	}
	.flex-1 {
		flex: 1;
	}
	.device-code {
		font-size: 32rpx;
		color: #F1F1F1;
	}
	.device-name {
		font-size: 40rpx;
		color: #FFFFFF;
	}
	.device-type {
		font-size: 20rpx;
		color: #FFFFFF;
	}
	.device-info {
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
	}
	.device-head {
		display: flex;
		flex: 1;
		align-items: center;
	}
	.device-head image {
		width: 100rpx;
		height: 100rpx;
		padding: 15rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		overflow: hidden;
	}
	.device-icon {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.device-item {
		position: relative;
		flex: 1;
		height: 380rpx;
		position: relative;
		padding: 20rpx;
		background-color: darkcyan;
	}
	.device-item:after {
		content: "";
		display: block;
		background: inherit;
		filter: blur(10rpx);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 10rpx;
		left: 10rpx;
		z-index: -1;
		opacity: 0.4;
		transform-origin: 0 0;
		border-radius: inherit;
		transform: scale(1, 1);
	}
</style>
