// import axios, { Canceler, CancelExecutor } from '../../src/index'

// const CancelToken = axios.CancelToken
// const source = CancelToken.source()

// axios.get('/cancel/get', {
//   cancelToken: source.token
// }).catch(function(e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled', e.message)
//   }
// })

// setTimeout(() => {
//   source.cancel('Operation canceled by the user.')

//   axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
//     if (axios.isCancel(e)) {
//       console.log(e.message)
//     }
//   })
// }, 100)

// let cancel: Canceler
// let executor: CancelExecutor = function(c) {
//   cancel = c
// }

// axios.get('/cancel/get', {
//   cancelToken: new CancelToken(executor)
// }).catch(function(e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled')
//   }
// })

// setTimeout(() => {
//   cancel()
// }, 200)







function xhr(fn: Function) {
  let resolvePromise

  let promise = new Promise((resolve, reject) => {
    resolvePromise = resolve

    setTimeout(() => {
      resolve('done')
    }, 1000)
  })
  
  function cancel(message) {
    resolvePromise(message)
  }
  
  fn(cancel)

  return promise
}


xhr(function(cancel) {
  setTimeout(() => {
    cancel('cancel')
  }, 500)
})
.then(res => {
  console.log(res)
})
