<template>
  <view class="work-container">
    <!-- 轮播图 -->
    <uni-swiper-dot class="uni-swiper-dot-box" :info="data" :current="current" field="content">
      <swiper class="swiper-box" :current="swiperDotIndex" @change="changeSwiper">
        <swiper-item v-for="(item, index) in data" :key="index">
          <view class="swiper-item" @click="clickBannerItem(item)">
            <image :src="item.image" mode="aspectFill" :draggable="false" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
	
	<view>
		<view>
			<button size="large" type="primary" style="margin: 10rpx 10rpx 0rpx 10rpx; background-color: darkorange" @click="toAddDevice">添加设备</button>
		</view>
		<uni-table ref="table" :loading="loading" stripe emptyText="暂无更多数据">
			<uni-tr v-for="(item, index) in tableData" :key="index" @row-click="rowClick(item)">
				<device-item :deviceCode="item.deviceCode" :deviceName="item.deviceName" :power="item.power" :store="item.store"/>
			</uni-tr>
		</uni-table>
	</view>
		
	<!-- <uni-table :loading="loading" border emptyText="暂无更多数据">
		<uni-tr>
			<uni-th width="30" align="center">设备型号</uni-th>
			<uni-th width="30" align="center">设备名称</uni-th>
			<uni-th width="10" align="center">库存</uni-th>
			<uni-th width="30" align="center">操作</uni-th>
		</uni-tr>
		<uni-tr v-for="(item, index) in tableData" :key="index" @row-click="rowClick(item)">
			<uni-td align="center">{{ item.deviceCode }}</uni-td>
			<uni-td align="center">{{ item.deviceName }}</uni-td>
			<uni-td align="center">{{ item.store }}</uni-td>
			<uni-td>
				<button size="mini" type="primary" @click.stop="storeIn(item)">入库</button>
				<button size="mini" type="warn" @click.stop="storeOut(item)">出库</button>
			</uni-td>
		</uni-tr>
	</uni-table> -->
  </view>
</template>

<script>
import { getDeviceList, addStore, subStore } from '@/api/system/device.js'
export default {
    data() {
		return {
			current: 0,
			swiperDotIndex: 0,
			data: [{
				image: '/static/images/banner/banner01.jpg'
			},
			{
				image: '/static/images/banner/banner02.jpg'
			},
			{
				image: '/static/images/banner/banner03.jpg'
			}],
			searchVal: '',
			tableData: [],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			loading: false
		}
    },
	onShow() {
		this.selectedIndexs = []
		this.getData(1)
	},
    methods: {
		clickBannerItem(item) {
			console.info(item)
		},
		changeSwiper(e) {
			this.current = e.detail.current
		},
		changeGrid(e) {
			this.$modal.showToast('模块建设中~')
		},
		// 多选处理
		selectedItems() {
			return this.selectedIndexs.map(i => this.tableData[i])
		},
		// 多选
		selectionChange(e) {
			console.log(e.detail.index)
			this.selectedIndexs = e.detail.index
		},
		// 批量删除
		delTable() {
			console.log(this.selectedItems())
		},
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},
		// 搜索
		search() {
			this.getData(1, this.searchVal)
		},
		// 获取数据
		getData(pageCurrent, value = '') {
			getDeviceList().then(res => {
				this.tableData = res.data
			})
		},
		toAddDevice() {
			this.$tab.navigateTo('/pages/device/add')
		},
		rowClick(item) {
			this.$tab.navigateTo('/pages/device/record?id=' + item.id)
		}
    }
  }
</script>

<style lang="scss">
  /* #ifndef APP-NVUE */
  page {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    min-height: 100%;
    height: auto;
  }

  view {
    font-size: 14px;
    line-height: inherit;
  }

  /* #endif */

  .text {
    text-align: center;
    font-size: 26rpx;
    margin-top: 10rpx;
  }

  .grid-item-box {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }

  .uni-margin-wrap {
    width: 690rpx;
    width: 100%;
    ;
  }

  .swiper {
    height: 300rpx;
  }

  .swiper-box {
    height: 150px;
  }

  .swiper-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 300rpx;
    line-height: 300rpx;
  }

  @media screen and (min-width: 500px) {
    .uni-swiper-dot-box {
      width: 400px;
      /* #ifndef APP-NVUE */
      margin: 0 auto;
      /* #endif */
      margin-top: 8px;
    }

    .image {
      width: 100%;
		}
	  }
  
	.uni-group {
		display: flex;
		align-items: center;
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
</style>
