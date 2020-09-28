import axios from 'axios'
import ctes from '../constants'

const axiosInstance = axios.create({
  baseURL: ctes.apiUrl,
  validateStatus: function (status) {
    // return status < 500; // Resolve only if the status code is less than 500
    return true
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['authorization'] = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosInstance
