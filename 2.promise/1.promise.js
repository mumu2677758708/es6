// Promise(承诺、允诺)  是一个类   （异步解决方案）
/* 
   三个状态：pending(等待中)、fulfilled(成功)、rejected(失败)
   成功态和失败态不能相互转化，即已经成功了，就不能变成失败；已经失败了，也不能转换成成功
   executor函数，会立即执行，参数是：resolve函数 、reject函数
   每个promise实例都有一个then方法
*/
let Promise = require('./write/2.多个then-promise')
let promise = new Promise((resolve,reject) => {
    console.log(1)
    // resolve('success')   
    // throw new Error() // 抛出错误时，会走then方法的err  相当于reject(new Error())
    setTimeout(()=> {
        resolve('success')
    },1000)
})

promise.then((val)=>{
    console.log(val)
},(err)=> {
    console.log(err,'fail')
})
promise.then((val)=>{
    console.log(val)
},(err)=> {
    console.log(err,'fail')
})
promise.then((val)=>{
    console.log(val)
},(err)=> {
    console.log(err,'fail')
})
console.log(2)  // 1 2 success