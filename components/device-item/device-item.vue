<template>
	<view class="device-item" :style="deviceThem">
		<!-- #ifndef MP-WEIXIN -->
		<canvas v-if="showCanvas" class="device-icon" :id="uuid" :canvas-id="uuid" />
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<canvas v-if="showCanvas" class="device-icon" id="deviceIcon" canvas-id="deviceIcon" />
		<!-- #endif -->
		<view class="device-head">
			<image :src="image"></image>
			<view class="device-info">
				<text class="device-name">{{deviceName}}</text>
				<text class="device-code">{{deviceCode}}</text>
			</view>
		</view>
		<view class="card-code">
			<view style="width: 60%;">
				<text class="omit-left">功率</text>
				<text class="omit-left">{{power}}</text>
			</view>
			<view style="width: 40%;">
				<text class="omit-right">库存</text>
				<text class="omit-right">{{store}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'deviceItem',
		props: {
			deviceCode: { type: String, required: true},
			deviceName: { type: String, required: true},
			power: { type: String, required: true, default: '1000KW'},
			store: { type: Number, required: true, default: 0}
		},
		computed: {
			waterMark() {
				return `background-image: url(${this.image});`
			}
		},
		data() {
			// #ifndef MP-WEIXIN
			const buildUuid = () => {
				return 'device_' + parseInt(Math.random() * 100000000);
			};
			// #endif
			return {
				deviceThem: '',
				image: '',
				showCanvas: true,
				// #ifdef MP-WEIXIN
				uuid: 'deviceIcon',
				// #endif
				// #ifndef MP-WEIXIN
				uuid: buildUuid()
				// #endif
			};
		},
		methods: {
			async buildItem() {
				this.showCanvas = false;
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

	.device-watermark {
		position: absolute;
		right: -184rpx;
		bottom: 0rpx;
		width: 144rpx;
		height: 90rpx;
		background-repeat: no-repeat;
		filter: drop-shadow(-204rpx 0rpx 0rpx #fff);
		opacity: 0.1;
	}

	.device-item {
		position: relative;
		flex: 1;
		height: 200rpx;
		margin: 10rpx;
		position: relative;
		border-radius: 20rpx;
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
