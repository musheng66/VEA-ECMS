import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // config里面有这个transformRequest，这个选项会在发送参数前进行处理。这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function(data) {
    data = Qs.stringify(data);
    return data;
  }],
  // 设置Content-Type
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    //config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error)
});

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    console.log('Download From: ' + response.config.url);
    return Promise.resolve(response.data);
  },
  error => {
    console.log('Download Error From: ' + error.config.url);
    Message({
      message: error.message,
      type: 'info',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  });

export default service
