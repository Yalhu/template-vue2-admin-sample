import request from '@/utils/request'
const api_base_path = '/scmisapi/common/school/'

// 获取学校的列表
export const getSchoolList = (params) => {

  return import('@mock/school').then(res => {
    console.log('mock data', res)
    return { data: { list: res._shool_resource_data.orderData, totalNum: 4 } }
  })
  request({
    url: `${api_base_path}list`,
    method: 'get',
    params
  })
}

// add学校
export const addSchool = (params) =>
  request({
    url: `${api_base_path}new`,
    method: 'post',
    params
  })

// 编辑学校
export const editSchool = (params) =>
  request({
    url: `${api_base_path}edit`,
    method: 'post',
    params
  })

// 获取学校详情
export const getSchoolDetail = (params) =>
  request({
    url: `${api_base_path}detail`,
    method: 'get',
    params
  })

// 更新学校信息
export const updateSchool = (params) =>
  request({
    url: `${api_base_path}update`,
    method: 'post',
    params
  })

// 学校上下架
export const updateStatus = (params) =>
  request({
    url: `${api_base_path}updateStatus`,
    method: 'post',
    params
  })

// 下载
export const downLoadList = (params) =>
request({
  url: `${api_base_path}listDownLoad`,
  method: 'get',
  params
})

// 上传
export function uploadFile(data = {}) {
  return request({
    url: `${api_base_path}upload`,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data
  })
}
