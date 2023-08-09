<template>
  <view class="content">
    <view class="personer-top flex">
      <view class="personer-avar van-hairline--surround">
        <van-image
          width="100%"
          height="100%"
          fit="scale-down"
          :src="state.avar"
        />
      </view>
      <view class="personer-info">
        <view class="personer-name">{{ state.RealName }}</view>
        <!-- <view class="personer-phone">{{ state.Mobile }}</view> -->
        <view v-if="state.JobName"
          ><van-tag
            type="primary"
            color="#f8f8f8"
            text-color="#333"
            size="medium"
            >{{ state.JobName }}</van-tag
          ></view
        >
      </view>
    </view>
    <van-cell-group inset>
      <van-cell title="账户与安全" size="large" />
      <van-cell title="工单" size="large" is-link clickable />
      <van-cell title="知识库" size="large" is-link clickable />
    </van-cell-group>

    <div class="block-button">
      <van-button
        color="#174f88"
        plain
        type="primary"
        style="width: 50%"
        @click="loginOut"
      >
        退出登录
      </van-button>
    </div>
  </view>
</template>

<script setup>
import { getUserInfo } from '@/services/login.js'
import { reactive } from 'vue'
import Cookie from 'js-cookie'
import { Toast } from 'vant'
import { uni } from '@dcloudio/uni-h5'

const state = reactive({
  avar: '',
  RealName: '',
  JobName: '',
  Mobile: ''
})

state.avar = JSON.parse(process.env.VITE_BASE_URL) + uni.getStorageSync('avar')
console.log(state.avar)

getUserInfo().then(res => {
  const { RealName, JobName, Mobile } = res.data
  state.RealName = RealName
  state.JobName = JobName
  state.Mobile = Mobile
})

const loginOut = () => {
  Cookie.remove('CompanyUserInfo')
  uni.reLaunch({ url: '/pages/login/index' })
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  background-color: #f8f8f8;
  // padding: 0 $uni-spacing-row-lg;
}
.personer-top {
  background-color: #4889cc;
  padding: $uni-spacing-row-lg;
  margin-bottom: 30px;
  align-items: center;
  .personer-avar {
    width: 4rem;
    height: 4rem;
    padding: $uni-spacing-row-sm;
    box-sizing: border-box;
    background: #174f88;
    border-radius: 50%;
    &::after {
      border-radius: 50%;
    }
  }
  .personer-info {
    color: #fff;
    margin-left: $uni-spacing-row-lg;
    .personer-name {
      font-size: $uni-font-size-lg;
      margin-bottom: $uni-spacing-col-base;
      font-weight: bold;
    }
    .personer-phone {
      font-size: $uni-font-size-sm;
      color: #f0f0f0;
      margin-bottom: $uni-spacing-col-sm;
    }
  }
}
.block-button {
  margin-top: 100px;
}
</style>
