<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="device" labelWidth="80px">
		<picker @change="deviceTypePickerChange" :value="deviceTypeIndex" :range="deviceTypeArray" range-key="dictName">
			<uni-forms-item label="设备类型" name="deviceType">
				<uni-easyinput v-model="deviceTypeArray[deviceTypeIndex].dictName" placeholder="请选择设备类型" :clearable="false" />
			</uni-forms-item>
		</picker>
        <uni-forms-item label="设备型号" name="deviceCode" required>
          <uni-easyinput v-model="device.deviceCode" placeholder="请输入设备型号" />
        </uni-forms-item>
        <uni-forms-item label="设备名称" name="deviceName" required>
          <uni-easyinput v-model="device.deviceName" placeholder="请输入设备名称" />
        </uni-forms-item>
        <uni-forms-item label="设备功率" name="power">
          <uni-easyinput v-model="device.power" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import { editDevice, deviceDetail } from "@/api/system/device"
import { getDictList } from "@/api/system/dict"

export default {
    data() {
      return {
        device: {
          deviceType: "",
          deviceCode: "",
          deviceName: "",
          power: ""
        },
		deviceTypeIndex: 0,
		deviceTypeArray: [{
			dictCode: null,
			dictName: null
		}],
        rules: {
          deviceCode: {
            rules: [{
              required: true,
              errorMessage: '设备型号不能为空'
            }]
          },
          deviceName: {
            rules: [{
              required: true,
              errorMessage: '设备名称不能为空'
            }]
          }
        }
      }
    },
    onLoad(option) {
		getDictList("divice_type").then(res => {
			this.deviceTypeArray = res.data
			this.device.deviceType = this.deviceTypeArray[this.deviceTypeIndex].dictCode
		})
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
				editDevice(this.device).then(response => {
					this.$modal.msgSuccess("添加成功")
					this.$tab.navigateBack(1)
				})
			})
		},
		deviceTypePickerChange(e) {
			this.deviceTypeIndex = e.detail.value
			this.device.deviceType = this.deviceTypeArray[e.detail.value].dictCode
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
