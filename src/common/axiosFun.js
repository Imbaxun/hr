import axios from 'axios'
import qs from 'qs'
import 'es6-promise'

//默认请求
axios.defaults.baseURL = '/api';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



export function postfun(url, zhydata) {
    return new Promise((resolve, reject) => {
      axios.post(url, zhydata).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(err => {
        // alert(err.response.data)
        reject(err)
      })
    })
  }

  export function putfun(url, zhydata) {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.parse(zhydata)
      ).then(res => {
        // console.log(res)
        resolve(res.data)
      }).catch(err => {
        // alert(err.response.data)
        reject(err)
      })
    })
  }

  export function deletefun(url, zhydata) {
    return new Promise((resolve, reject) => {
      axios.delete(url, qs.parse(zhydata)
      ).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(err => {
        // alert(err.response.data)
        reject(err)
      })
    })
  }

  export function postfun2(url, zhydata) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.parse(zhydata)
      ).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(err => {
        // alert(err.response.data)
        reject(err)
      })
    })
  }

  export function getfun(url, zhydata) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        // console.log(res)
        resolve(res.data)
      }).catch(err => {
        // alert(err.response.data)
        reject(err)
      })
    })
  }