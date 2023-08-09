import { createSSRApp } from 'vue'
import App from './App.vue'

//#ifdef H5
import vant from 'vant'
import 'vant/lib/index.css'
import './static/styles/common.scss'
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
