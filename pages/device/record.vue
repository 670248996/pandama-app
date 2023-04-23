<template>
	<view class="uni-container">
		<view class="content" style="margin-bottom: 10px;">
			<device-detail :device="device"/>
		</view>
		<uni-table ref="table" :loading="loading" border emptyText="暂无更多数据">
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<device-record :record="item" />
			</uni-tr>
		</uni-table>
	</view>
</template>
<script>
import { getRecordList, deviceDetail } from '@/api/system/device.js'
  
export default {
	data() {
		return {
			deviceId: null,
			tableData: [],
			loading: false,
			device: {}
		}
	},
    onLoad(option) {
		this.deviceId = option.id
    },
	onShow() {
		this.deviceDetail()
		this.refresh()
	},
	methods: {
		deviceDetail() {
			deviceDetail(this.deviceId).then(res => {
				this.device = res.data
			})
		},
		refresh() {
			let data = {
				deviceId: this.deviceId
			}
			getRecordList(data).then(res => {
				this.tableData = res.data
			})
		}
	}
}
</script>
<style>
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-group {
	display: flex;
	align-items: center;
}
</style>

