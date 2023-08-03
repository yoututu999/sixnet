<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ 11 }}</text>
    </view>
    <!--#ifdef H5-->
    <van-button type="primary">主要按钮</van-button>
    <!--#endif-->
    <!--#ifdef MP-WEIXIN-->
    <van-cell title="单元格" value="内容" />
    <!--#endif-->
  </view>
</template>

<script setup>
import { authInfo } from '@/services/login.js'

authInfo({
  value: 9
}).then(res => {
  console.log(res)
})
</script>

<style>
.content {
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
