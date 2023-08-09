<script>
import { isLogin } from '@/services/login'
export default {
  onLaunch: function () {
    console.log('App Launch')
    isLogin().then(res => {
      console.log(res)
      if (res.data) {
        // // 如果缓存中有上次查看的页面
        // uni.getStorage({
        //   key: 'def_url',
        //   success: res => {
        //     if (res.data) {
        //       if(['home','report','notice','personer'].indexOf(res.data) != )
        //     } else uni.reLaunch({ url: '/pages/home/index' })
        //   }
        // })
        return
      }
      uni.reLaunch({ url: '/pages/login/index' })
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
/* #ifdef MP-WEIXIN */
@import './wxcomponents/vant/dist/common/index.wxss';
/* endif */
@import '//at.alicdn.com/t/c/font_4204275_9ideuxgvfkv.css';
</style>
