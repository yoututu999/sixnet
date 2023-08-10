<template>
	<view class="content">
		<view class="bg bg-blur"></view>

		<view class="login-title">
			<text>{{ company.title }}</text>
		</view>

		<van-form @submit="onSubmit">
			<van-cell-group inset>
				<van-field v-model="dataForm.login" name="login" label="账号" placeholder="请输入登录用户名"
					:rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="dataForm.pwd" type="pwd" name="密码" label="密码" placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
			</van-cell-group>
			<view class="block-button">
				<van-button color="#174f88" round block type="primary" native-type="submit" @click="onSubmit">
					提交
				</van-button>
			</view>
		</van-form>

		<view class="footer">京ICP备05005350号-5</view>
	</view>
</template>

<script>
import {
    authInfo,
    authLogin
} from '@/services/login.js'
// #ifdef H5
import {
    Toast
} from 'vant'
// #endif
export default {
    data() {
        return {
            company: {
                title: '',
                companyid: 9
            },
            dataForm: {
                login:'zhai',
                pwd:'123456'
            }
        }
    },
    onLoad() {
        authInfo({
            value: this.company.companyid
        }).then(res => {
            console.log(res)
            if (!res.data) return
            this.company.title = res.data.Title
            uni.setStorageSync('avar', res.data.LogoUrl)
        })
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values)
            authLogin({
                ...this.dataForm,
                companyid: this.company.companyid,
                code: ''
            }).then(res => {
                // #ifdef H5
                Toast(res.msg)
                // #endif
                uni.switchTab({
                    url: '/pages/home/index'
                })
            })
        }
    }
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
		padding: 140px 0 80px;
		z-index: 2;
		position: relative;
	}

	.bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background:radial-gradient(circle, #298af1, #0d3793);
		/*#ifdef H5 */
		background: url('../../static/imgs/bg.png') no-repeat center;
		background-size: 100% 100%;
		/* #endif */
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