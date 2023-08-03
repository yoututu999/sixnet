// axios二次封装
import { getToken } from "@/utils/auth";
import { toast } from "vant";
//映入axios相关
import axios from "axios";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";
import buildFullPath from "axios/lib/core/buildFullPath"; //解决axios0.19.0以上版本无法请求问题
 
//根据环境变量获取api地址
let baseURL = process.env.config[process.env.UNI_SCRIPT].VITE_BASE_API;
// let evnName = process.env.config[process.env.UNI_SCRIPT] 获取当前处于哪个开发环境
console.log("baseURL:", baseURL, "++++++++++++++++++++++++");
 

 
class HttpRequest {
  constructor() {
    this.baseURL = baseURL; // 从环境变量中获取api地址
    this.timeout = 300000;
  }
  // ...上面已贴出封装方式
  //解决uniapp 适配axios请求，避免报adapter is not a function错误
  axios.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
      const fullurl = buildFullPath(config.baseURL, config.url);
      uni.request({
        method: config.method.toUpperCase(),
        url: buildURL(fullurl, config.params, config.paramsSerializer),
        header: config.headers,
        data: config.data,
        dataType: config.dataType,
        responseType: config.responseType,
        sslVerify: config.sslVerify,
        complete: function complete(response) {
          response = {
            data: response.data,
            status: response.statusCode,
            errMsg: response.errMsg,
            header: response.header,
            config,
          };
   
          settle(resolve, reject, response);
        },
      });
    });
  };
}
 
export default new HttpRequest();