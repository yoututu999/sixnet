<template>
  <view class="content">
    <view class="bg bg-blur"></view>
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

<style lang="scss">
.content {
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('http://114.115.171.22/taihe/img/timg.jpg') no-repeat center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
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
