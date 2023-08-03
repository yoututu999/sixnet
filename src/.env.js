// if(process.env.NODE_ENV === 'development'){
//     //开发环境
//     ENV_CONFIG = require('.env.dev.js');
// }else if(process.env.NODE_ENV === 'production'){
//     //生产环境
//     ENV_CONFIG = require('.env.prod.js');
// }else if(process.env.NODE_ENV === 'test'){
// 	ENV_CONFIG = require('.env.test.js');
// }
 
// //给环境变量process.uniEnv赋值
// if (ENV_CONFIG) {
//     process.uniEnv = {};
//     for (let key in ENV_CONFIG) {
//         process.uniEnv[key] = ENV_CONFIG[key];
//     }
// }
// 导出的环境请求地址
//本地环境
const dev = {
  ENV: "dev",
  VITE_BASE_API: "http://127.0.0.1:8080/dev-api",
};
 
//正式环境
const pro = {
  ENV: "pro",
  VITE_BASE_API: "https://xxx/prod-api",
};
 
//测试环境
const test = {
  ENV: "test",
  VITE_BASE_API: "https://xxx/test-api",
};
 
export default {
  dev,
  test,
  pro,
};