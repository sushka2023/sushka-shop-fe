import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'https://www.test-store.shop/'
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('token')

    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
