import axios from '@/utils/myaxios.js'

// 登陆验证
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
