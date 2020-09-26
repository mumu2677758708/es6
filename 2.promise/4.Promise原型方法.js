// .catch  .finally  Promise.resolve() Promise.reject()
let Promise = require('./write/3.链式调用')

// let p = new Promise((resolve,reject) => {
//     resolve(111)
// })

/* 
  1） .catch(err => {})  <===> p.then(null,err => {})
*/
// p.then(data => {
//     throw new Error()
// }).then(() => {
//     console.log(222)
// }).catch(err => {
//     console.log(err, 'err')
// }).then(() => { // .catch后面还可以继续执行.then方法，没有返回值，默认return undefined
//     console.log('finally')
// })

/* 2）finally
   不管promise最后的状态，都会执行
   finally的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected
*/
// p.then(data => {
//     throw new Error()
// }).finally(() => { // 无论如何都会执行
//     console.log(222)
// }).catch(err => {
//     console.log(err, 'err')
// }).then(() => { // .catch后面还可以继续执行.then方法，没有返回值，默认return undefined
//     console.log('finally')
// })

/* 3) new Promise()中返回一个new Promise() */
// let p = new Promise((resolve,reject) => {
//     resolve(new Promise((resolve,reject) => {
//         setTimeout(()=> {
//             resolve(100)
//         })
//     }))
// })
// p.then(data => {
//     console.log(data)
// })

/* 
   4) Promise.resolve()  Promise.reject()
*/
// ===> Promise.resolve(111).then(data => {})
let p = new Promise((resolve,reject) => {
    resolve(111)
})
p.then(data => {
    console.log(data)
})

Promise.reject(new Error()).catch(err => {
    console.log(err, 'err')
})

