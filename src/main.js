import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/styles/fonts/iconfont.css'
import './static/styles/common.scss'
//#ifdef H5
import vant from 'vant'
import 'vant/lib/index.css'
// #endif
export function createApp () {
  const app = createSSRApp(App)
  //#ifdef H5
  app.use(vant)
  // #endif
  return {
    app
  }
}
