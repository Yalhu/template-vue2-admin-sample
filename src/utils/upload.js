import axios from 'axios'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
const appEnv = process.env.VUE_APP_BUILD_ENV
const isPord = appEnv === 'online'
const APPID = isPord ? 10086 : 10010

const AccessKeySecret = isPord
  ? '75axxxxxxxxxa3'
  : '30xxxxxxxxxx5e' // 密钥串

const request = axios.create({
  // 不携带cookie
  withCredentials: false,
  timeout: 9000000
})

const formatFileName = (filename, keyMd5) => {
  const reg = /\.[^.]+$/g
  const matches = filename.match(reg) || ['']
  const ext = matches.pop()
  return `${md5(`${filename}&${keyMd5}`)}${ext}`
}

export async function commonUpload({ file, onProgress }, returnParams = false) {
  const time = Date.parse(new Date()) // 获取当前时间戳
  // console.log('APPID', APPID)
  // console.log('AccessKeySecret', AccessKeySecret)
  const keyMd5 = md5(`${AccessKeySecret}&${time}`) // 生成加密串
  const sign = Base64.encode(`${keyMd5}&${time}`) // 签名，访问upload应用的凭证
  const baseURL = 'https://upload.xxxxxx.com'
  const url = `${baseURL}/v2/upload_param`
  const fileName = file.name || 'default_name'
  const dst_path = `creators-storage/${formatFileName(
    fileName,
    keyMd5
  )}`.toLowerCase() // 文件在云端的存储位置
  const file_right = 0 // 文件的属性，0指公有读，1指私有读
  try {
    const rowRes = await request.get(url, {
      headers: { appid: APPID, sign },
      params: {
        dst_path,
        user_mark: 0,
        file_right
      }
    })
    if (rowRes.state === 0) {
      // 接口异常
      return Promise.reject(rowRes.errmsg)
    }
    const res = rowRes.data
    let ele = res.data.find((x) => x.type === 'OSS')
    if (returnParams) {
      // 只返回上传参数
      return returnParams
    }

    const { data } = await request({
      method: ele.method,
      url: ele.host,
      headers: ele.request_header,
      data: file,
      onUploadProgress: function(progressEvent) {
        // Do whatever you want with the native progress event
        const percent = (progressEvent.loaded / progressEvent.total) * 100
        onProgress({ percent })
      }
    })
    if (data.stat === 1) {
      return Promise.resolve(ele.file_url) // 上传成功返回URL
    } else {
      return Promise.reject(data) // 上传失败
    }
  } catch (err) {
    console.warn('/v2/upload_param异常 ===> ', err)
    return Promise.reject(err)
  }
}
