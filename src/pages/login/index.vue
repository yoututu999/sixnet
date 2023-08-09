<template>
  <view class="content">
    <view class="bg bg-blur"></view>
    <view class="login-title">
      <text>{{ company.title }}</text>
    </view>

    <!--#ifdef H5-->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="dataForm.login"
          name="login"
          label="账号"
          placeholder="请输入登录用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="dataForm.pwd"
          type="pwd"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="block-button">
        <van-button
          color="#174f88"
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
    <!--#endif-->
    <!--#ifdef MP-WEIXIN-->
    <van-cell title="单元格" value="内容" />
    <!--#endif-->
    <view class="footer">京ICP备05005350号-5</view>
  </view>
</template>

<script setup>
import { authInfo, authLogin } from '@/services/login.js'
import { reactive } from 'vue'
import { Toast } from 'vant'

const company = reactive({
  title: '',
  companyid: 9
})
const dataForm = reactive({})

authInfo({
  value: company.companyid
}).then(res => {
  console.log(res)
  if (!res.data) return
  company.title = res.data.Title
  uni.setStorageSync('avar', res.data.LogoUrl)
})

const onSubmit = values => {
  console.log('submit', values)
  authLogin({
    ...dataForm,
    companyid: company.companyid,
    code: ''
  }).then(res => {
    Toast(res.msg)

    uni.switchTab({ url: '/pages/home/index' })
  })
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  padding: 0 $uni-spacing-row-lg;
}
.login-title {
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  padding: 100px 0 80px;
  z-index: 2;
  position: relative;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('../../static/imgs/bg.png') no-repeat center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -ms-filter: blur(3px);
  filter: blur(3px);
  z-index: 0;
}
.footer {
  position: absolute;
  bottom: 20px;
  display: block;
  width: 100%;
  text-align: center;
  color: #787878;
  font-size: $uni-font-size-sm;
}
</style>
