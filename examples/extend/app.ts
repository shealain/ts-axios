import axios, { AxiosRequestConfig } from '../../src/index'
import { METHODS } from 'http'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios('/extend/post', {
  method: 'post',
  data: {
    msg: '我是接收两个参数的。。。。'
  }
})

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

const userObj: AxiosRequestConfig = {
  method: 'POST',
  data: { result: { name: 'jhon', age: 17 } }
}
function getUser<T>() {
  return axios<ResponseData<T>>('/extend/post', userObj)
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()