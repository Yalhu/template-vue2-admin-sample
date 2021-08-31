/** **   request.js   ****/
import axios from 'axios'
import { mainAppUtils } from '@/utils'
// const { Message, Loading } = ELEMENT
const { Message, Loading } = 'element-ui'


// 1. 创建新的axios实例，
const service = axios.create({
  // 公共接口, 目前测试和线上的环境的baseURL是没有区分的，所以暂时写死
  baseURL: process.env.VUE_APP_BASE_API,
  // 需要注意是，当配置了xhr.withCredentials = true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*。
  // 如果在同域下配置xhr.withCredentials，无论配置true还是false，效果都会相同，且会一直提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
  withCredentials: true,
  // 超时时间 单位是ms，这里设置了15s的超时时间
  timeout: 5000
})

let loadingInstance
let loadingTimer = null
// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    if(config.loading && !loadingInstance) {
        loadingInstance = Loading.service({
          target: '.el-main',
          lock: true,
          text: '正在加载数据... ...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    const url = config.url
    // 批量上传接口超时处理 || 接口更新后处理掉
    if(url.indexOf('/common/school/upload') !== -1) {
      config.timeout = 60 * 1000
    }
    // console.log('interceptors config', config)
    return config
  },
  (error) => {
    Message({
      message: '请求接口异常',
      type: 'error',
      duration: 3 * 1000,
      center: true
    })
    Promise.reject(error)
  }
)

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    if (!loadingTimer) {
      loadingTimer = setTimeout(() => {
        if(loadingInstance) {
          loadingInstance.close()
          loadingInstance = null
        }
        loadingTimer = null
      }, 300)
    }
    if (response.status === 200) {
      const code = response.data.code
      switch (code) {
        case 10000:
          if (mainAppUtils.redirectMainLogin) {
            mainAppUtils.redirectMainLogin()
          } else {
            window.open('//app.xxxxx.com/login', '_blank')
          }
          break
        case 10012 || 10013:
          if (mainAppUtils.reredirectMainWait) {
            mainAppUtils.reredirectMainWait()
          }
          break
        case 0:
          break
        default:
          Message({
            message: response.data.msg || response.data.message,
            type: 'error',
            duration: 3 * 1000,
            center: true
          })
          return Promise.reject(response.data.msg || response.data.message)
      }
      return response.data
    } else {
      return Promise.resolve(new Error('API 接口请求错误！' + response))
    }
  },
  (error) => {
    /** *** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          // window.location.href = `${process.env.BASE_URL}404`
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        console.error('服务器响应超时，请刷新当前页')
      }
      console.error('连接服务器失败')
    }

    // console.error(error.message)
    Message({
      message: error.message || '请求接口异常',
      type: 'error',
      duration: 3 * 1000,
      center: true
    })
    /** *** 处理结束 *****/
    // 如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response)
  }
)
// 4.导入文件
export default service
