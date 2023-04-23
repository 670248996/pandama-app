<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="device" labelWidth="80px">
		<uni-forms-item label="设备型号" name="deviceCode">
			<uni-easyinput v-model="device.deviceCode" :disabled="true" />
		</uni-forms-item>
        <uni-forms-item label="设备名称" name="deviceName">
          <uni-easyinput v-model="device.deviceName" :disabled="true" />
        </uni-forms-item>
        <uni-forms-item label="设备功率" name="power">
          <uni-easyinput v-model="device.power" :disabled="true" />
        </uni-forms-item>
        <uni-forms-item label="库存数量" name="store">
          <uni-easyinput v-model="device.store" :disabled="true" />
        </uni-forms-item>
        <uni-forms-item label="入库数量" name="operationNum">
          <uni-easyinput type="number" v-model="device.operationNum" placeholder="请输入入库数量" />
        </uni-forms-item>
        <uni-forms-item label="供应商" name="customerName">
          <uni-easyinput v-model="device.customerName" placeholder="请输入供应商" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
  import { addStore, deviceDetail } from "@/api/system/device"

  export default {
    data() {
      return {
        device: {
			id: "",
			deviceCode: "",
			deviceName: "",
			power: "",
			store: "",
			operationNum: "",
			customerName: ""
        },
        rules: {
          operationNum: {
            rules: [{
              required: true,
              errorMessage: '入库数量不能为空'
            }]
          }
        }
      }
    },
    onLoad(option) {
		deviceDetail(option.id).then(res => {
			this.device = res.data
		})
    },
    onReady() {
		this.$refs.form.setRules(this.rules)
    },
    methods: {
		submit(ref) {
			this.$refs.form.validate().then(res => {
				this.addStore()
			})
		},
		addStore() {
			addStore(this.device).then(res => {
				this.$tab.navigateBack(1)
			})
		}
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
  }
</style>
