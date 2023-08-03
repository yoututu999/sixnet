// vits.config.ts
import {
    defineConfig
} from 'vite'
import * as path from 'path' // 加上它
import uni from '@dcloudio/vite-plugin-uni'
// import ENV_CONFIG from "./src/.env.js";
// 按需加载时不区分平台小程序运行会报错
// import styleImport, { VantResolve } from "vite-plugin-style-import";

export default defineConfig({
    resolve: {
        alias: {
            '@': `${path.resolve(__dirname, 'src')}/`,
        },
        extensions: ['.mjs', '.js', '.jsx', '.json', '.vue'],
    },
    plugins: [
        uni(),
        // //#ifdef H5
        // styleImport({
        //       resolves: [VantResolve()],
        //  libs: [
        //           {
        //             libraryName: 'vant',
        //             esModule: true,
        //             resolveStyle: name => `../es/${name}/style`
        //           }
        //         ]
        //     }),
        //  //#endif
    ],
    server: {
        port: '3002',
    },
    define: {
        'process.env': {
            VITE_BASE_URL: JSON.stringify('http://114.115.171.22/')
        },
        'process.production': {
            VITE_BASE_URL: JSON.stringify('https://example1.com')
        }
    },
})