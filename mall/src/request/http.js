import axios from 'axios';
import $qs from 'qs'
axios.defaults.baseURL ='https://www.shinecrystal.cn/api/';
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  post(url,data={},other={},param){
    return new Promise((resolve,reject) => {
      url = url+'?store_id='+data.id+'&_platform='+data.platform+'&access_token='+data.token+other
      axios.post(url,$qs.stringify(param))
        .then(response => {
          resolve(response.data);
        },err => {
          reject(err)
        })
    })
  },
  get(url,data={},other={},param){
    return new Promise((resolve,reject) => {
      url = url+'?store_id='+data.id+'&_platform='+data.platform+'&access_token='+data.token+other
      axios.get(url,$qs.stringify(param))
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
